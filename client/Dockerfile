# Use official Node.js 20 image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lockfile for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source files
COPY . .

# Build production assets
RUN npm run build

# -----------------------------
# Stage 2: Serve with lightweight web server
# -----------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Install a lightweight web server for static files
RUN npm install -g serve

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Expose Vite/production port (usually 5173 for dev or 3000 for serve)
EXPOSE 5173

# Serve the built frontend
CMD ["serve", "-s", "dist", "-l", "5173"]
