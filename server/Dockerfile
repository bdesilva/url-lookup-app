FROM node:7.2.1
MAINTAINER Benjamin De Silva

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/

# Install nodemon and gulp
RUN npm install -g nodemon
RUN npm install -g gulp

WORKDIR /src
ADD . /src

EXPOSE  8008
CMD ["gulp"]
