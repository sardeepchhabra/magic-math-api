FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# ===== For development =====
FROM base AS dev
RUN npm install --only=development
COPY . .
CMD ["npm", "run", "dev"]

# ===== For production =====
FROM base AS prod
COPY . .

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the API port
EXPOSE 5000

# Run the application
CMD ["node", "src/server.js"]