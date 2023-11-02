#! /bin/bash

# Absolute path to ts-proto plugin
TS_PROTO_PLUGIN="$(pwd)/node_modules/ts-proto/protoc-gen-ts_proto"

# Set the path to your project's apps folder
APPS_DIR="./"

# Use find to get a list of all .proto files under the apps folder
PROTO_FILES=$(find $APPS_DIR -name "*.proto")

# Iterate over each .proto file found
for PROTO_FILE in $PROTO_FILES; do
  # Get the directory of the current .proto file
  DEST_DIR=$(dirname $PROTO_FILE)

  # Change to the directory of the current .proto file
  pushd $DEST_DIR

  # Run the protoc command on the current .proto file,
  # specifying the output directory as the current directory (.)
  protoc --plugin=$TS_PROTO_PLUGIN -I $(pwd) \
    --ts_proto_opt=outputEncodeMethods=true,useEnumNames=false,asClass=false,outputJsonMethods=true,context=false,outputNestJs=true,outputClientImpl=false \
    --ts_proto_out=. $(basename $PROTO_FILE)

  # Change back to the original working directory
  popd
done