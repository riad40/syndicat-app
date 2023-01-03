FROM node

RUN npm install -g nodemon

WORKDIR /api

COPY . .

RUN npm install

CMD ["npm", "start"]
