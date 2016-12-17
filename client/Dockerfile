FROM node:7.2.1
MAINTAINER Benjamin De Silva

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Install nodemon, gulp, webpack, and babel-cli
RUN npm install -g nodemon
RUN npm install -g gulp
RUN npm install -g webpack
RUN npm install -g babel-cli@6.11.x

WORKDIR /src
ADD . /src

EXPOSE 3000
CMD ["npm", "start"]
