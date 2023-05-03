FROM node:latest

WORKDIR /users

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "start"]