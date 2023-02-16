FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


# Install app dependencies
COPY package*.json /usr/src/app
RUN npm ci
# RUN npm run build
COPY . /usr/src/app

# Expose port
EXPOSE 8900

#Run the app
CMD [ "npm", "start" ]