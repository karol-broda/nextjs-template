#!/usr/bin/env bash

db_container_name="template-postgres"
db_image="pgvector/pgvector:pg18"
db_name="nextjs-template"
db_user="postgres"
db_password="password"
db_port="5432"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --db-container-name)
      db_container_name="$2"
      shift 2
      ;;
    --db-image)
      db_image="$2"
      shift 2
      ;;
    --db-name)
      db_name="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $0 [--db-container-name <name>] [--db-image <image>] [--db-name <name>]"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

if ! command -v docker &>/dev/null; then
  echo "docker is not installed. Please install it: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker info &>/dev/null; then
  echo "Docker daemon is not running. Please start docker."
  exit 1
fi

container_id=$(docker ps -aq -f name="$db_container_name")
if [ -n "$container_id" ]; then
  if docker ps -q -f name="$db_container_name" | grep -q .; then
    echo "Container '$db_container_name' is already running."
  else
    docker start "$db_container_name" && echo "Started existing container '$db_container_name'."
  fi
  exit 0
fi

docker run -d \
  --name "$db_container_name" \
  -e POSTGRES_USER="$db_user" \
  -e POSTGRES_PASSWORD="$db_password" \
  -e POSTGRES_DB="$db_name" \
  -p "$db_port":5432 \
  "$db_image" && echo "Container '$db_container_name' created."

echo "Connection: postgresql://${db_user}:${db_password}@localhost:${db_port}/${db_name}"
