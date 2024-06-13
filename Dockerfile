FROM node:18

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY . .

ENV MONGO_URI=mongodb://mongo:27017/test
ENV PORT=3000

RUN mkdir -p /data/db

RUN docker-entrypoint.sh mongod &

CMD ["yarn", "start"]