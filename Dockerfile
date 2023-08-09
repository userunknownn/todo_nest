FROM node:16

WORKDIR /todo-app

COPY . .

RUN ["git", "config", "--global", "--add", "safe.directory", "/todo-app"]

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000
