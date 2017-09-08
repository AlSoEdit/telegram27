FROM node:8

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN cd /app && npm install

COPY . /app

EXPOSE 3000
EXPOSE 8080

CMD ["npm", "start"]