{
  description = "nextjs template devshell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };

    actions-nix = {
      url = "github:nialov/actions.nix";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-parts.follows = "flake-parts";
    };
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.actions-nix.flakeModules.default
      ];

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      perSystem = {pkgs, ...}: {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            bun
            nodejs_22
            postgresql_18
            oxlint
            playwright-driver.browsers
          ];

          shellHook = ''
            export PLAYWRIGHT_BROWSERS_PATH="${pkgs.playwright-driver.browsers}"
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS="1"
            export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD="1"

            if [ -n "$PS1" ]; then
              echo "bun: $(bun --version)"
              echo "node: $(node --version)"
              echo "psql: $(psql --version)"
              echo "playwright browsers: $PLAYWRIGHT_BROWSERS_PATH"
            fi
          '';
        };
      };

      flake.actions-nix = let
        setupSteps = [
          {uses = "actions/checkout@v4";}
          {uses = "DeterminateSystems/determinate-nix-action@v3";}
          {uses = "DeterminateSystems/magic-nix-cache-action@v13";}
        ];

        devRun = cmds:
          builtins.concatStringsSep "\n"
          ([''eval "$(nix print-dev-env)"''] ++ cmds);

        installAndRun = cmds:
          devRun (["bun install --frozen-lockfile"] ++ cmds);
      in {
        workflows.".github/workflows/ci.yml" = {
          name = "ci";

          on = {
            push.branches = ["master"];
            pull_request.branches = ["master"];
          };

          concurrency = {
            group = "\${{ github.workflow }}-\${{ github.ref }}";
            cancel-in-progress = true;
          };

          jobs = {
            check = {
              name = "lint & typecheck";
              steps =
                setupSteps
                ++ [
                  {
                    run = installAndRun [
                      "bun run check"
                      "bun run format:check"
                    ];
                  }
                ];
            };

            test = {
              name = "unit tests";
              steps =
                setupSteps
                ++ [{run = installAndRun ["bun test"];}];
            };

            build = {
              name = "build";
              env.SKIP_ENV_VALIDATION = "true";
              steps =
                setupSteps
                ++ [{run = installAndRun ["bun run build"];}];
            };

            e2e = {
              name = "e2e tests";
              services.postgres = {
                image = "pgvector/pgvector:pg18";
                env = {
                  POSTGRES_USER = "postgres";
                  POSTGRES_PASSWORD = "password";
                  POSTGRES_DB = "nextjs-template";
                };
                ports = ["5432:5432"];
                options = "--health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5";
              };
              env = {
                DATABASE_URL = "op://CICD/nextjs-template/DATABASE_URL";
                BETTER_AUTH_SECRET = "op://CICD/nextjs-template/BETTER_AUTH_SECRET";
                NEXT_PUBLIC_URL = "op://CICD/nextjs-template/NEXT_PUBLIC_URL";
              };
              steps =
                [
                  {uses = "actions/checkout@v4";}
                  {
                    name = "load secrets";
                    uses = "1Password/load-secrets-action@v2";
                    "with".export-env = true;
                    env.OP_SERVICE_ACCOUNT_TOKEN = "\${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}";
                  }
                  {uses = "DeterminateSystems/determinate-nix-action@v3";}
                  {uses = "DeterminateSystems/magic-nix-cache-action@v13";}
                ]
                ++ [
                  {
                    name = "install & prepare database";
                    run = installAndRun ["bun run db:push"];
                  }
                  {
                    name = "run e2e tests";
                    run = devRun ["bun run e2e"];
                  }
                  {
                    name = "upload playwright report";
                    "if" = "\${{ !cancelled() }}";
                    uses = "actions/upload-artifact@v4";
                    "with" = {
                      name = "playwright-report";
                      path = "playwright-report/";
                      retention-days = 14;
                    };
                  }
                ];
            };
          };
        };
      };
    };
}
