# —— 1. Builder stage ——
FROM node:25-alpine AS builder
WORKDIR /app

# 复制仓库
COPY . .

# 安装依赖
RUN corepack enable && pnpm install --frozen-lockfile

# 构建：只构建当前 app（依赖由 turborepo 自动处理）
RUN pnpm turbo run build --filter=@repo/next-fe

# —— 2. Runtime stage ——
FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3003

# 复制构建产物
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3003
CMD ["node", "node_modules/next/dist/bin/next", "start"]
