# Bun docker images are broken on Mac OS Apple Silicon, so we need to use a frankenversion
# https://github.com/oven-sh/bun/issues/4723
# Still faster than using npm :)

FROM node:alpine AS build

# Install the correct glibc to run Bun
RUN if [[ $(uname -m) == "aarch64" ]] ; \
    then \
    # aarch64
    wget https://raw.githubusercontent.com/squishyu/alpine-pkg-glibc-aarch64-bin/master/glibc-2.26-r1.apk ; \
    apk add --no-cache --allow-untrusted --force-overwrite glibc-2.26-r1.apk ; \
    rm glibc-2.26-r1.apk ; \
    else \
    # x86_64
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk ; \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub ; \
    apk add --no-cache --force-overwrite glibc-2.28-r0.apk ; \
    rm glibc-2.28-r0.apk ; \
    fi
RUN npm install -g bun

# End of imported code
#FROM oven/bun:latest AS build

WORKDIR /app
COPY package.json bun.lockb /app/
RUN bun install --frozen-lockfile --production

COPY . .

RUN bun run build

# Send it to a nginx image
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
