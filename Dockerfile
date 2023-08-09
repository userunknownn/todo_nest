FROM node:16

WORKDIR /todo-app

COPY ./package.json /todo-app

RUN yarn 

COPY . /todo-app

RUN yarn global add jest ts-jest @nestjs/testing

RUN ["git", "config", "--global", "--add", "safe.directory", "/todo-app"]

EXPOSE 3000
