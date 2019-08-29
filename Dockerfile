FROM node:10-alpine
RUN apk add yarn
RUN apk add openssh-client
RUN apk add rsync
