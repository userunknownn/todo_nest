#!/usr/bin/env bash

echo "Installing dependencies"
yarn;

echo "Prisma orm setup";
yarn prisma generate;
yarn prisma migrate reset --force;

echo "Start the application"
yarn start:dev;

