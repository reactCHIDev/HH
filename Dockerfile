FROM node:10.19 as build

WORKDIR /frontend
COPY . /frontend

RUN npm install

RUN npm run build

EXPOSE 3000/tcp

CMD ["npm", "start"]
