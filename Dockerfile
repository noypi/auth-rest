# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Files required by pnpm install
COPY --chown=node package.json pnpm-lock.yaml ./

# Run pnpm install
RUN pnpm install --frozen-lockfile --prod 

# Bundle app source
COPY . .

# Start the server using the production build
CMD [ "pnpm", "start:prod" ]
