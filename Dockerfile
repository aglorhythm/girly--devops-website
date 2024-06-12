# Use the official Node.js 22.1.0 image
FROM node:22.1.0

# ✿ Set working directory
WORKDIR /app


# Copy package.json and yarn.lock before other files to leverage Docker layer caching
COPY package.json .
COPY package-lock.json .
RUN ls -la

# Install dependencies
RUN npm config set registry http://registry.npmjs.org/
RUN npm ci --verbose

# Copy all files left except ignored files from .dockerignore, then list them
COPY . .
RUN ls -la


# Expose port 3000 for the application
EXPOSE 3000

# Command to start the app using Yarn
CMD ["npm", "run", "dev"]
