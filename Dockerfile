FROM node:17-slim

RUN mkdir -p /app

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

COPY package*.json /app

WORKDIR /app

ENTRYPOINT ["../docker-entrypoint.sh"]