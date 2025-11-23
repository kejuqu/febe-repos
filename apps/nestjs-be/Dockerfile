# Builder stage: Build the application
FROM node:25-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root dependency management files
COPY package.json ./
COPY . ./

# Copy all packages and apps source code.
# This ensures that workspace dependencies can be resolved.

# Install all dependencies and build the application
RUN pnpm install
RUN pnpm run build

# Production stage: Create the final image
FROM node:25-alpine AS production

WORKDIR /app

# Only copy the built application and its production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
RUN echo "🏆 build complete 🏆"

CMD ["node", "dist/main.js"]
EXPOSE 8080