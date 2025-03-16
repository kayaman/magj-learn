# Start with the Node.js LTS image
FROM node:lts AS builder

# Install dependencies for D2
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Set up workspace directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci


# Copy the rest of the application code
COPY . .

RUN npx astro telemetry disable

# Build the Astro application
RUN npm run build

# Install D2

# Runtime image
FROM node:lts-slim

# Copy D2 from the builder
# COPY --from=builder /usr/local/bin/d2 /usr/local/bin/d2
RUN curl -fsSL https://d2lang.com/install.sh | sh -s --
RUN export PATH=$HOME/.local/bin:$PATH

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY package*.json ./

# Expose the port that Astro uses by default
EXPOSE 4321

# Set the command to run the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]