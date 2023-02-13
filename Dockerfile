FROM node:18-alpine as builder
ARG WORKSPACE
WORKDIR /builder
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ .yarn/
COPY packages/galaxy/package.json packages/galaxy/package.json
COPY packages/system/package.json packages/system/package.json
RUN yarn install --immutable
COPY . .
RUN yarn workspace $WORKSPACE build
RUN cd packages/$WORKSPACE && yarn workspaces focus --production

FROM node:18-alpine as runner
ARG WORKSPACE
WORKDIR /app
RUN apk add --no-cache tzdata
USER node
EXPOSE 46710
ENV NODE_ENV=production
ENV TZ=Europe/Paris
COPY --from=builder --chown=node:node /builder/node_modules /app/node_modules
COPY --from=builder --chown=node:node /builder/packages/$WORKSPACE/build /app
CMD ["node", "index.js"]
