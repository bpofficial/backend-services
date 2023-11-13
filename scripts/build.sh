#!/bin/bash

# Initialize variables with default values
APP_NAME="*"
NEST_ARGS=()
CHANGED_FLAG=false
DOCKER_FLAG=false

# Process command-line arguments
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --app|-a)
      APP_NAME="$2"
      shift # past the --app or -a argument
      shift # past the app name
      ;;
    --changed)
      CHANGED_FLAG=true
      shift # past the --changed argument
      ;;
    --docker)  # New option to build Docker image
      DOCKER_FLAG=true
      shift # past the --docker argument
      ;;
    *)
      # Collect other arguments for nest build
      NEST_ARGS+=("$1")
      shift
      ;;
  esac
done

# Get the list of changed apps in the 'apps' directory if the --changed flag is provided
if [ "$CHANGED_FLAG" = true ]; then
  CHANGED_APPS=$(git diff --name-only HEAD~1 HEAD "apps/" | cut -d'/' -f2 | sort -u)

  # Check if there are any changed apps
  if [ -z "$CHANGED_APPS" ]; then
    echo "No changed apps found in 'apps'."
    exit 0
  fi
fi

# Build only the specified app or all apps if no specific app is provided
if [ "$APP_NAME" = "*" ]; then
  APPS=$(ls -1 ./apps)
  for APP in $APPS; do
    echo "Building service: $APP"
    nest build "$APP" "${NEST_ARGS[@]}"

    if [ "$DOCKER_FLAG" = true ]; then
      echo "Building Docker image for $APP"
      bash ./scripts/package.sh --app $APP --docker
    else
      bash ./scripts/package.sh --app $APP
    fi
  done
else
  # Build the specified app with additional arguments
  echo "Building app: $APP_NAME"
  nest build "$APP_NAME" "${NEST_ARGS[@]}"

  if [ "$DOCKER_FLAG" = true ]; then
    echo "Building Docker image for $APP"
    bash ./scripts/package.sh --app $APP_NAME --docker
  else
    bash ./scripts/package.sh --app $APP_NAME
  fi
fi

echo "All builds completed successfully."

if [ "$PACKAGE_FLAG" = true ]; then
  echo "All apps have been packaged."
fi
