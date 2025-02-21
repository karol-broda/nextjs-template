import original_config from '~/drizzle.config';
import { MigrationConfig, readMigrationFiles } from 'drizzle-orm/migrator';

const config = {
  ...original_config,
  migrationsFolder: original_config.out,
} as MigrationConfig;

const migrations = readMigrationFiles(config);

function escapeSqlString(str: string): string {
  return str.replace(/'/g, "''");
}

async function main() {
  const tableName = original_config.migrations?.table || 'migrations';
  const sqlStatements: string[] = [];

  sqlStatements.push(
    `
CREATE TABLE IF NOT EXISTS ${tableName} (
  id serial primary key,
  hash text NOT NULL,
  created_at bigint
);
  `.trim()
  );

  sqlStatements.push('BEGIN;');

  sqlStatements.push(`DELETE FROM ${tableName};`);

  migrations.forEach((migration, index) => {
    sqlStatements.push(
      `INSERT INTO ${tableName} (id, hash, created_at) VALUES (${index}, '${escapeSqlString(migration.hash)}', ${migration.folderMillis});`
    );
  });

  sqlStatements.push('COMMIT;');

  console.log(sqlStatements.join('\n'));
}

console.log('start\n');
main()
  .then(() => {
    console.log('\nend');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating SQL:', error);
    process.exit(1);
  });
