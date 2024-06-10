FROM debian:bookworm-slim

# ✿ Set working directory
WORKDIR /app

# ✿ Install packages
COPY package.json yarn.lock ./
RUN yarn install --verbose

# Copy all files except ignored files from .dockerignore
COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]