FROM node:16
WORKDIR /app
COPY package*.json ./
RUN apt-get update
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build
RUN cd .next
EXPOSE 2310
CMD [ "npm", "run", "start" ]
