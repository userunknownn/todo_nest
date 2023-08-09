#!/usr/bin/env bash

echo "Installing dependencies"
yarn;

echo "Prisma orm setup";
yarn prisma generate;
yarn prisma migrate reset --force;

echo "\n################################################";
echo "################## Unit tests ##################";
echo "################################################\n";

yarn test;

echo "\n################################################";
echo "############### Functional tests ###############";
echo "################################################\n";
yarn test:e2e;



