FROM node:10
WORKDIR /app
CMD npm install && npm run start:dev
