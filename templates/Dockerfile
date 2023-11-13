# Use a lightweight Node.js base image
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile

# Copy the rest of the application source code to the container
COPY . .

# Create a minimal final image
FROM node:18-alpine

# Install node-foreman globally
RUN npm i -g foreman

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/policies ./policies
COPY --from=builder /app/proto ./proto
COPY --from=builder /app/Procfile ./Procfile
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/main.js ./main.js

EXPOSE 80
EXPOSE 9090

# Define the command to start your Nest.js application
CMD [ "nf", "start" ]

