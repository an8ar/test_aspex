FROM node:18.15.0-alpine

WORKDIR /app

COPY . .

RUN yarn 

EXPOSE 5173

CMD [ "yarn", "dev" , "--host"]