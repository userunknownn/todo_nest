#!/usr/bin/env bash

echo "Installing dependencies"
yarn;

echo "Prisma orm setup";
yarn prisma generate;
yarn prisma migrate reset --force;

echo -e "\n################################################";
echo "################## Unit tests ##################";
echo -e "################################################\n";

yarn test;

echo -e "\n################################################";
echo "############### Functional tests ###############";
echo -e "################################################\n";
yarn test:e2e;



