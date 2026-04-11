FROM node:25-alpine AS builder

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY ./package*.json ./

RUN npm install --silent

COPY . .

RUN rm -rf .next
RUN npm run build

FROM node:25-alpine AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=80

RUN apk add --no-cache openssl

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN addgroup -S app && adduser -S app -G app

CMD ["node", "server.js"]
