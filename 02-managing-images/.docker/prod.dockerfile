FROM node:25-alpine

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=80

COPY ./package*.json ./
RUN npm install --silent

COPY . .

RUN rm -rf .next
RUN npm run build

RUN mkdir -p .next/standalone/.next && \
  cp -r .next/static .next/standalone/.next/ && \
  cp -r public .next/standalone/ 2>/dev/null || true

RUN addgroup -S app && adduser -S app -G app
RUN apk add --no-cache openssl

USER app

EXPOSE 80

CMD ["node", ".next/standalone/server.js"]