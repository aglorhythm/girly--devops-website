FROM node:22.1.0

# ✿ Set working directory
WORKDIR /app

# ✿ Copy all files except ignored files from .dockerignore
COPY . .
RUN ls -lah

# ✿ Install packages
RUN npm install 

# ✿ Expose my app port
EXPOSE 3000

CMD ["npm", "run", "dev"]