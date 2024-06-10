FROM node:22

# ✿ Set working directory
WORKDIR /app

# ✿ Configure hosts file to handle the Yarn redirection issue
# This manually sets the IP for yarnpkg.com to avoid redirection problems
RUN echo "34.141.48.9 yarnpkg.com" >> /etc/hosts

# ✿ Set npm and Yarn to use the HTTP registry
RUN npm config set registry "http://registry.npmjs.org" && \
    yarn config set registry "http://registry.npmjs.org"

# ✿ Install packages
COPY package.json yarn.lock ./
RUN yarn install --verbose

# ✿ Copy all files left except ignored files from .dockerignore
COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]