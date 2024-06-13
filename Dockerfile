# Use the official Node.js 22.1.0 image
#FROM node:bookworm-slim
FROM node:22.1.0

# ✿ Set working directory
WORKDIR /app

RUN corepack enable

# ✿ Copy package.json and yarn files
COPY package*.json .
COPY .yarnrc.yml .

# ✿ Install dependencies et set berry version for yarn
RUN yarn set version berry
RUN yarn 

# ✿ Copy all files left except ignored files from .dockerignore, then list them
COPY . .

# ✿ Expose port 3000 for the application
EXPOSE 3000

# ✿ Build app
RUN yarn build

# ✿ Run app
CMD ["yarn", "run", "start"]
