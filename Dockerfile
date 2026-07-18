# Stage 1: Build the React app with Node
# We use a pinned LTS version of Node on Alpine for a small and reproducible build image.
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests first for Docker layer caching:
# as long as package.json and package-lock.json don't change, `npm ci` is cached.
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application source
COPY . .

# Build the static site into the `dist/` directory
RUN npm run build

# Stage 2: Serve the built app with Nginx
# Using the alpine variant keeps the final image under 25 MB.
FROM nginx:1.25-alpine

# Remove the default Nginx configuration and static files
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# Copy our custom Nginx config (with gzip, caching, health endpoint)
COPY nginx/default.conf /etc/nginx/conf.d/

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (the container listens on 80; we map a host port in docker-compose or at run time)
EXPOSE 80

# Health check — Nginx exposes a /health endpoint via our config
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

# Run Nginx in the foreground (not daemonized) so Docker can monitor the process
CMD ["nginx", "-g", "daemon off;"]
