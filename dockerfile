# Build stage
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install

# Production stage
FROM node:18-alpine
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY . .

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000', (r) => {if (r.statusCode !== 404) throw new Error(r.statusCode)})"

CMD ["node", "index.js"]

