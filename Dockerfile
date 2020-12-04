FROM node:10.19 as build

WORKDIR /frontend
COPY . /frontend

RUN npm install

RUN npm run build

RUN npm install -g serve


#EXPOSE 3000/tcp
EXPOSE 5000/tcp

#CMD ["npm", "start"]
CMD ["serve", "-s", "build"]
