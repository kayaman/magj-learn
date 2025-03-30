FROM node:lts

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL https://d2lang.com/install.sh | sh -s --

WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npx playwright install --with-deps
COPY . .
RUN npm run build && touch dist/.nojekyll