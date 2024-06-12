# Use the official Node.js 22.1.0 image
FROM node:22.1.0-bullseye

# ✿ Update packages and install curl and bash
RUN apt-get update && apt-get install -y curl bash && apt-get clean && rm -rf /var/lib/apt/lists/*

# ✿ Set working directory
WORKDIR /app

# ✿ Enable Corepack to manage Yarn versions
RUN corepack enable

# ✿ Copy package.json and yarn files
COPY package.json .
COPY .yarnrc.yml .
COPY yarn.lock .

# ✿ Install dependencies
RUN yarn config set registry https://registry.yarnpkg.com
RUN yarn install --immutable --verbose

# ✿ Copy all files left except ignored files from .dockerignore, then list them
COPY . .

# ✿ Expose port 3000 for the application
EXPOSE 3000

# ✿ Build app
RUN yarn build

# ✿ Run app
CMD ["yarn", "run", "start"]
