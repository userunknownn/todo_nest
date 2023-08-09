#!/usr/bin/env bash

echo "Installing dependencies"
yarn;

echo "Prisma orm setup";
yarn prisma generate;
yarn prisma migrate reset --force;

echo "Unit tests"
yarn test;

echo "Functional Tests"
yarn test:e2e;



