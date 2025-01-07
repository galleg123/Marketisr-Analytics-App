# Node.js runtime to use
FROM node:21 AS builder
# Set working directory
WORKDIR /app
# Copy package.json to work directory
COPY package*.json ./
#Install dependencies
RUN npm install
#Copy the rest of code
COPY . .
# Build the app
RUN npm run build

# Runtime Stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
