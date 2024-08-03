FROM node:20-slim

EXPOSE ${WEB_PORT}

WORKDIR /usr/src/app

COPY . ./

RUN npm i

CMD npm run start