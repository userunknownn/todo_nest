#!/usr/bin/env bash

echo "Prisma orm setup";
yarn prisma generate;
yarn prisma migrate reset --force;

echo "Start the application"
yarn start;



