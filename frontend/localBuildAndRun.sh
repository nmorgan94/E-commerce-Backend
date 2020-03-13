#!/bin/bash 
docker build --build-arg REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} -t frontend:latest .
docker run  -p 8080:3000 frontend