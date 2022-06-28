---
layout: post
title: "Teamcity agent as Docker container"
author: [masimplo]
tags: [""]
image: ../images/headers/teamcity-post-banner.jpg
date: "2016-10-16"
draft: false
---

Updating teamcity agents with external project dependencies (e.g. gulp cli or nodejs version) can be a pain, especially if you have many build agents that are not maintained through some tooling like puppet, ansible etc. [Jetbrains](https://www.jetbrains.com/) have recently released official docker images for both the [TeamCity](https://www.jetbrains.com/teamcity/) server and agents. If you follow their [guide](https://hub.docker.com/r/jetbrains/teamcity-agent/) you will see they recommend starting the vanilla image, bashing in, installing everything you need and then commit this container as your custom image. Unfortunately this cannot be versioned controlled, is hard to reproduce and even harder to remember what's in that magical container a few days after creating.

In my opinion a much nicer way is to use the more established approach in the docker community of starting off with their image as a base in a Dockerfile and setting up everything inside that Dockerfile.

For example I wanted a build agent that could build a javascript project using gulp. Let's take a look:

```Dockerfile
FROM jetbrains/teamcity-agent

# Install nodejs
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 6.8.1

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

# Install our global dependencies
RUN npm i -g gulp typings

# Set default environmental variables
ENV SERVER_URL="http://teamcity-server.mydomain.com"
ENV AGENT_NAME="build-agent-1"
```

So we base our docker image from `jetbrains/teamcity-agent` then install nodejs as is done in the [official nodejs docker image](https://hub.docker.com/_/node/) and finally we install our global npm packages required for the build.

I chose to have a separate RUN command for the global packages as they are changing more often than nodejs version changes and would hate to have to build that whole layer again and again.

All you have to do now is run `docker build -t username/teamcity-agent .` in the same directory as the above Dockerfile and you are good to go.
