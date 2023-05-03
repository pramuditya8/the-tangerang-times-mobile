FROM node:latest

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "start"]