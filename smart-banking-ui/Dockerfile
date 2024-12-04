FROM ubuntu:latest
LABEL authors="bisha"

ENTRYPOINT ["top", "-b"]

# Use a Node.js image to build the frontend
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build

# Use a lightweight web server to serve the build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
