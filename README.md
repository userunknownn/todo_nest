# Todo nest
## A todo backend made in nestjs
The following tech were used in this project: <br/>
MySQL, NestJS, Prisma ORM, Docker, Swagger


## How to run
This application requires: docker, docker-compose

To a quick run:
```sh
docker-compose up -d
```
The application runs on port 3000 : <br /> 
```sh 
http://localhost:3000
```


## Development
You can follow the quick run instructions and then,
with your code editor modify the code of the project.
Your changes will be hot reloaded into the container

To visualize the execution of the application,
you can see the logs in your terminal from the container's terminal.

```sh
docker-compose logs --follow backend
``` 

You can also attach you terminal to the container's terminal 
after the ``docker-compose up -d``,
with:

```sh
docker exec -it todo-backend bash
```

Once you get into the container's terminal,
you can run the unit tests like this: 
```sh
yarn test
``` 
And the e2e tests :
```sh
yarn test:e2e
```

If you just want to run all the tests you can do:
```sh
docker-compose -f docker-compose.test.yaml up
```

When you finish with the application,
you can just stop the execution of the background containers:
```sh 
docker-compose down
```

## Documentation 
To view the documentation, you can enter the following URL in the browser: <br/> 
```sh
http://localhost:3000/api
```