# Build Stage
FROM node as build-stage

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000
CMD ["npx", "nx", "start", "web"]
