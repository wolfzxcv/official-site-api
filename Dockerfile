FROM node:18-alpine

ENV APP_ROOT /app/

RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY package*.json ${APP_ROOT}
RUN npm install

COPY . ${APP_ROOT}
RUN npm run build

CMD [ "npm", "start" ]

# docker build -t [image name] .
# docker run -d -p process.env.PORT:process.env.PORT [image name] 