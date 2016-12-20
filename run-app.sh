#!/bin/bash
# Installer script for the URL search application.

# Remove all containers prior to kicking off a build.
docker rm $(docker ps -a -q)
docker-compose down
docker-compose rm

# Run docker-compose up to start the application.
docker-compose up
