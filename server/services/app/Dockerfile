FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "start"]