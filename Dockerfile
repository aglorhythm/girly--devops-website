# Use the official Node.js 22.1.0 image
FROM node:alpine


# ✿ Update packages and install curl and bash
RUN apk update && apk add --no-cache curl bash

# ✿ Install newer version of yarn 
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 4.3.0
ENV PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# ✿ Set working directory
RUN mkdir -p /app
WORKDIR /app

# ✿ Copy package.json and yarn.lock before other files to leverage Docker layer caching
COPY package.json .
COPY yarn.lock .

# ✿ Install dependencies
RUN yarn config set registry https://registry.yarnpkg.com
RUN yarn install --prefer-offline --frozen-lockfile --verbose

# ✿ Copy all files left except ignored files from .dockerignore, then list them
COPY . .

# ✿ Expose port 3000 for the application
EXPOSE 3000
RUN yarn build


# ✿ Command to start the app using yarn
CMD ["yarn", "run", "start"]
