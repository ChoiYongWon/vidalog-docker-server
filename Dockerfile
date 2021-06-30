FROM node:latest

COPY . /vidalog

WORKDIR /vidalog

RUN apt-get update && apt-get install

ENTRYPOINT ["yarn","run","start:prod"]

EXPOSE 3000