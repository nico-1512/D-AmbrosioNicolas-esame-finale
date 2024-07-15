FROM node:18.18-alpine

WORKDIR /app

ARG PORT
ENV PORT=${PORT}

COPY ./package*.json .

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]