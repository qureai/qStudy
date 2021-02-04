FROM node:10 as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install -g serve
# Copy app source code
COPY . .

# CMD serve -s build
CMD npm start
