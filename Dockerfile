# syntax=docker/dockerfile:1.4

# 1) Install *all* deps + optional (so TailwindCSS + LightningCSS binaries land)
FROM node:20-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=optional=false --omit=peer=false

# 2) Build the Next.js app
ARG TARGETPLATFORM
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) Final runtime image (prod-only)
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# only copy what standalone needs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
