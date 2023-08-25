FROM node:lts-alpine as angular
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN npm run build


FROM nginx
VOLUME "/var/cache/nginx" 
COPY --from=angular  app/dist/icarus.angular /usr/share/nginx/html
