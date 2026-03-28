# ── Stage 1: Build ────────────────────────────────────────────
FROM node:24-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline

COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Copy pre-rendered static output
COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Non-root for security
RUN addgroup -S webben && adduser -S webben -G webben \
  && chown -R webben:webben /usr/share/nginx/html \
  && chown -R webben:webben /var/cache/nginx \
  && chown -R webben:webben /var/log/nginx \
  && touch /var/run/nginx.pid \
  && chown webben:webben /var/run/nginx.pid \
  && chown -R webben:webben /etc/nginx/conf.d

USER webben

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
