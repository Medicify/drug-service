FROM node:18.14.2-slim AS base

RUN apt-get update

WORKDIR /drug-service

# build the code
FROM base AS builder

# Install devDep & dep
COPY package.json ./
COPY yarn.lock ./


RUN yarn install --development
COPY .env .env



COPY tsconfig.json ./
COPY src ./src
COPY public ./public

RUN yarn run build

FROM base AS production

COPY package*.json /drug-service/
COPY yarn*.lock /drug-service/


RUN yarn install --production   
COPY prisma /drug-service/prisma
RUN yarn prisma generate

COPY --from=builder /drug-service/build /drug-service/build

COPY --from=builder /drug-service/public /drug-service/public
COPY --from=builder /drug-service/.env /drug-service/.env


EXPOSE 5000
CMD ["node", "build/server.js"]

