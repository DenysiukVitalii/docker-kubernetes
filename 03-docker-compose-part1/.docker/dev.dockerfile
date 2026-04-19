FROM node:25-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH

# install app dependencies
COPY simple-app/package.json .
COPY simple-app/package-lock.json .
RUN npm install --silent

# copy source code
COPY simple-app .

CMD ["npm", "run", "dev"]