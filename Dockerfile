# Use the official Node.js 22.1.0 image
FROM node:22.1.0

# ✿ Set working directory
WORKDIR /app

# Use the HTTP registry
RUN npm config set registry "http://registry.npmjs.org" && \
    npm install -g yarn && \
    yarn config set registry "http://registry.npmjs.org"

# Copy package.json and yarn.lock before other files to leverage Docker layer caching
COPY package.json yarn.lock .

# Install dependencies
RUN yarn install --verbose

# Copy all files left except ignored files from .dockerignore, then list them
COPY . .
RUN ls -la

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the app using Yarn
CMD ["yarn", "dev"]
