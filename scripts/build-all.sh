#!/bin/bash

# Get a list of all app names from the apps directory
APPS=($(ls -1 ./apps))

# Additional arguments for nest build
NEST_ARGS="$@"

# Iterate over all apps and build them
for APP in "${APPS[@]}"; do
    echo "Building $APP..."
    ./scripts/build.sh $APP $NEST_ARGS
    if [[ $? -ne 0 ]]; then
        echo "Build failed for $APP. Exiting."
        exit 1
    fi
    echo "Build succeeded for $APP."
done

echo "All builds completed successfully."
