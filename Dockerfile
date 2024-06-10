FROM node:22

# Working directory
WORKDIR /app

# Copy all files except ignored files from .dockerignore
COPY . .

# Install dependencies
RUN npm install --verbose && npm cache clean --force

EXPOSE 3000

CMD ["npm", "run", "dev"]