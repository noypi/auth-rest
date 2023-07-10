# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

#
# mysql
#
ENV MYSQL_ROOT_PASSWORD 123456
ENV MYSQL_ROOT_HOST %
ENV MYSQL_USER mysql
ENV MYSQL_PASSWORD 123456
ADD ./apps/mysql/db.sql /docker-entrypoint-initdb.d
#EXPOSE 3306

#
# client/server
#

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
