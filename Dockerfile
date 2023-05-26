FROM node:18.14.2-slim AS base

RUN apt-get update

WORKDIR /server-node-ts

# build the code
FROM base AS builder

# Install devDep & dep
COPY package.json ./
COPY yarn.lock ./


RUN yarn install --development

COPY prisma ./server-node-ts/prisma
COPY .env .env
RUN yarn prisma db pull 
RUN yarn generate

COPY tsconfig.json ./
COPY src ./src
COPY public ./public

RUN yarn run build

FROM base AS production

COPY package*.json /server-node-ts/
COPY yarn*.lock /server-node-ts/


RUN yarn install --production

COPY --from=builder /server-node-ts/build /server-node-ts/build
COPY --from=builder /server-node-ts/prisma /server-node-ts/prisma
COPY --from=builder /server-node-ts/public /server-node-ts/public
COPY --from=builder /server-node-ts/.env /server-node-ts/.env


EXPOSE 5000
CMD ["node", "build/server.js"]

