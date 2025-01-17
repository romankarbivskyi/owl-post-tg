
FROM node:20-alpine as build

ARG VITE_API_URL=http://localhost:5000/api

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
