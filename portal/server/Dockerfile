FROM node:10 as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --silent

# copy app source code
COPY src/ src/

CMD npm run dev
