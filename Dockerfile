FROM node:22

# ✿ Set working directory
WORKDIR /app


# ✿ Install packages
COPY package.json yarn.lock ./
RUN yarn install --verbose

# ✿ Copy all files left except ignored files from .dockerignore
COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]