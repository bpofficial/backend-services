#!/bin/bash

# Store the current working directory
CURRENT_DIR=$(pwd)

APP_NAME="*"
DOCKER_FLAG=false
COMMIT_HASH=$(git rev-parse --short HEAD)  # Get current commit hash

# Process command-line arguments
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --app|-a)
      APP_NAME="$2"
      shift # past the --app or -a argument
      shift # past the app name
      ;;
    --docker)  # New option to build Docker image
      DOCKER_FLAG=true
      shift # past the --docker argument
      ;;
    *)
  esac
done

# Create a temporary directory to store the package contents
TEMP_DIR="$CURRENT_DIR/artifacts/$APP_NAME"

# Create the proto directory in the build output if it doesn't exist
mkdir -p "$TEMP_DIR/app/proto"

# Copy proto files to the build output
cp "libs/proto/src/"*.proto "$TEMP_DIR/app/proto/"

# Copy policy files to the build output
cp -r "policies" "$TEMP_DIR/app/policies/"

# Copy the application files to the packaging directory
cp -r "dist/apps/$APP_NAME/." "$TEMP_DIR/app/"

# Copy the templates to the packaging directory
cp -r "templates/." "$TEMP_DIR/"

mv "$TEMP_DIR/Dockerfile" "$TEMP_DIR/app/Dockerfile"
mv "$TEMP_DIR/Procfile" "$TEMP_DIR/app/Procfile"

# Copy package.json and yarn.lock files to the packaging directory
cp "./package.json" "$TEMP_DIR/app"
cp "./yarn.lock" "$TEMP_DIR/app"
cp "./tsconfig.json" "$TEMP_DIR/app"

mkdir -p "$CURRENT_DIR/artifacts"

# Update the values.yaml file with the extracted values
VALUES_YAML="$TEMP_DIR/values.yaml"

# Use yq to update the values.yaml file with yq v4 syntax
yq eval --inplace ".service = \"$APP_NAME\"" "$VALUES_YAML"

# Change the working directory to the package directory
cd "$TEMP_DIR"

if [ "$DOCKER_FLAG" = true ]; then
  # Get the monolith package name as a scope for the image
  APPLICATION=$(jq -r .name "$CURRENT_DIR/package.json")

  # Get the version from package.json
  VERSION=$(jq -r .version "$CURRENT_DIR/package.json")

  # Get the current timestamp in the format YYYYMMDD-HHMM
  TIMESTAMP=$(date +'%Y%m%d-%H%M')

  IMAGE="$APPLICATION/$APP_NAME:$VERSION-commit$COMMIT_HASH-$TIMESTAMP"

  # Calculate MD5 hash of package.json and yarn.lock
  PACKAGE_HASH=$(md5sum "$CURRENT_DIR/package.json" "$CURRENT_DIR/yarn.lock" | awk '{print $1}')

  docker build -t "$IMAGE" -f "$TEMP_DIR/app/Dockerfile" "$TEMP_DIR/app/" --build-arg CACHEBUST=$(date +%s) --build-arg SERVICE=$APP_NAME --build-arg PACKAGE_HASH="$PACKAGE_HASH"

  # Set the image name
  yq eval --inplace ".image = \"$IMAGE\"" "$VALUES_YAML"
else
  # Create the zip file with the contents of the temporary directory
  zip -r "$APP_NAME.zip" . &> /dev/null

  # Move the zip file to the desired location
  mv "$APP_NAME.zip" "$CURRENT_DIR/artifacts/"
fi

# Print success message
if [ "$?" -eq 0 ]; then
    echo "Package created successfully for $APP_NAME"
else
    echo "Failed to create package for $APP_NAME."
    exit 1
fi
