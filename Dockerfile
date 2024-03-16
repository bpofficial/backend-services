# Use a lightweight Node.js base image
FROM node:18 as builder

WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs yarn
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

FROM node:18-alpine

WORKDIR /app

# Copy node_modules & package files
COPY --from=builder /app/node_modules  /app/node_modules

ARG PATH 
# Copy only the necessary files from the builder stage
COPY "${PATH}/policies" /app/policies
COPY "${PATH}/proto"    /app/proto
COPY "${PATH}/main.js"  /app/main.js

# Need to keep port 80 open on all images for the health check
EXPOSE 80
EXPOSE 50051

# Define the command to start your Nest.js application
CMD [ "node", "main.js" ]
