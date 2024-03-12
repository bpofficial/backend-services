#!/bin/bash

# Initialize variables with default values
APP_NAME="*"
NEST_ARGS=()
CHANGED_FLAG=false
DOCKER_FLAG=false

# Function to get applications with their paths from nest-cli.json
get_applications_with_paths() {
  jq -r '.projects | to_entries | .[] | select(.value.type=="application") | "\(.key)=\(.value.root)"' ./nest-cli.json
}

# Function to build a single app
build_app() {
  local app_name=$1
  local app_path=$2
  echo "Building service: $app_name"
  nest build "$app_name" "${NEST_ARGS[@]}" --path "$app_path"

  if [ "$DOCKER_FLAG" = true ]; then
    echo "Building Docker image for $app_name"
    bash ./scripts/package.sh --app "$app_path" --docker
  else
    bash ./scripts/package.sh --app "$app_path"
  fi
}

# Process command-line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --app|-a)
      APP_NAME="$2"
      shift 2
      ;;
    --changed)
      CHANGED_FLAG=true
      shift
      ;;
    --docker)
      DOCKER_FLAG=true
      shift
      ;;
    *)
      NEST_ARGS+=("$1")
      shift
      ;;
  esac
done

# Handling changed apps
if [ "$CHANGED_FLAG" = true ]; then
  CHANGED_APPS=$(git diff --name-only HEAD~1 HEAD "apps/" | cut -d'/' -f2 | sort -u)
  if [ -z "$CHANGED_APPS" ]; then
    echo "No changed apps found in 'apps'."
    exit 0
  fi
  # Filter CHANGED_APPS using jq, only building changed ones
  declare -A APPS_MAP
  while IFS='=' read -r app path; do
    APPS_MAP[$app]=$path
  done < <(get_applications_with_paths)
  for app in $CHANGED_APPS; do
    if [[ ${APPS_MAP[$app]+_} ]]; then
      build_app "$app" "${APPS_MAP[$app]}"
    fi
  done
else
  # Building all or specific app
  if [ "$APP_NAME" = "*" ]; then
    while IFS='=' read -r app path; do
      build_app "$app" "$path"
    done < <(get_applications_with_paths)
  else
    build_app "$APP_NAME" "$(jq -r ".projects.$APP_NAME.root" ./nest-cli.json)"
  fi
fi

echo "All builds completed successfully."

if [ "$DOCKER_FLAG" = true ]; then
  echo "All Docker images have been built."
fi
