# Stage 1: Build Angular app
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Angular in production mode
RUN npx ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built Angular app to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy custom Nginx config if needed
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
