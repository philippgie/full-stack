FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm --force ci

ENV DEBUG=playground:*
  
USER node

CMD npm start
