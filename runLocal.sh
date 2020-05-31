#!/bin/bash
set -e

docker build -t backend .

docker run -p 8080:8080 -e DB_CONNECTION_STRING=jdbc:h2:mem:testdb -e JWT_SECRET=JWTSuperSecretKey backend


