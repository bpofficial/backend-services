#!/bin/bash

# Check if app name argument is provided
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <app-name> [additional nest arguments]"
    exit 1
fi

APP_NAME=$1

# Shift all positional parameters to the left by 1
# This drops $1 and leaves $2 as $1, $3 as $2, and so on
shift 1

# Build the app with additional arguments
nest build $APP_NAME "$@"

# Check if the build succeeded
if [ "$?" -ne 0 ]; then
    echo "Build failed. Exiting."
    exit 1
fi

# Create the proto directory in the build output if it doesn't exist
mkdir -p "dist/apps/$APP_NAME/proto"

# Copy proto files to the build output
cp "libs/proto/src/"*.proto "dist/apps/$APP_NAME/proto"

# Print success message
if [ "$?" -eq 0 ]; then
    echo "Proto files have been copied successfully to dist/apps/$APP_NAME/proto"
else
    echo "Failed to copy proto files."
    exit 1
fi
