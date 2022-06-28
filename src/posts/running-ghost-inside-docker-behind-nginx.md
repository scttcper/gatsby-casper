---
layout: post
title: "Running Ghost inside docker behind nginx"
author: [masimplo]
tags: [""]
image: ../images/headers/docker.png
date: "2016-09-25"
draft: false
---

##Let's get us some segregation

So you want to run Ghost inside docker so you don't have to mess around with your perfectly running server and you want to segregate ghost from the rest of the services on the same server and all these other goodies that docker gives you out of the box.

Well let me stop you there. Ghost is actually not a great example for something that runs in docker, because it is as simple as hosting a hello world nodejs server, so there isn't much to it, but it might prove useful to someone starting out with docker.

Ghost is a single nodejs process serving dynamically generated pages with data fetched from a simple SQLite db rather than a bulky mySQL or similar. And that is the beauty of it, you really don't need much to serve some formatted text and a few images. And that is part of why Ghost is so fast, orders of magnitude faster than its competition. It does things simply, without trying to be a silver bullet solution, it has a niche audience, but probably a very satisfied one.

But why am I telling you that? Well, doing something small but doing it great is the new kid in the block. This is a big part of the nodejs philosophy, having [micro modules](https://github.com/parro-it/awesome-micro-npm-packages), with small focus that they do one thing awesomely. Nodejs is great for IO performance, but not so great for other thinks like caching, compressing, proxying etc. Don't get me wrong you can do all that with node, point is you probably shouldn't. That's why we have nginx. Placing an nginx proxy in front of you node server app is a win-win situation. You are offloading tasks from you project, so you don't have to worry about them, and you delegate them to someone that is really really good at doing them. Everyone should be happy :D

### docker compose
Best way to get two or more containers running together is docker compose. You write a yaml file - *not really crazy about yaml but what are you gonna do?* - that describes your services - *also storage, network etc if you need to* - and their correlation, you run a single command and everything is up and running.
Let's take a look at how a yaml for a Ghost blog behind an nginx would look.

```yaml
version: '2'

services:
  proxy:
    build: ./proxy
    restart: always
    links:
      - maddev-web:maddev
    ports:
      - "80:80"
      - "443:443"

  maddev-web:
    image: ghost
    restart: always
    volumes:
      - ./web/ghost:/var/lib/ghost
    ports:
      - "2368"
```

As you probably guessed I am using v2 of docker-compose.yml format which apart from declaring the version and grouping the two definitions under a `services` key, there isn't any difference from a v1 format.

So we first declare a proxy service, that will use a customised nginx build (more on this later), we link it to the ghost service we define below (maddev-web) and we bind ports 80 and 443 to the host. Port 443 is not going to do anything yet, I will write up how we are going to set SSL in another post, so you can just as well omit it.

Then we declare our Ghost blog service, which uses the official ghost image from docker hub. We declare a volume binding whatever is in subdirectory `web/ghost` to be mounted as `/var/lib/ghost`. Cool thing with volumes is, that if that local directory is empty, contents of the image will be placed there so in essence bringing in all of ghost's files. When you edit them though, next time you start the container, your local files will take precedence over the image's.

Notice that we are not binding the Ghost port (2368) to the host, instead we are exposing it so that it can be accessed by linked containers that will hit `container-ip:exposed-port` and since we know the port and the container ip can be retrieved by using the link alias - an entry in `/etc/hosts` has been automatically added due the linking resolving the alias to the linked container's ip - we can just do `ghost:2846` in the nginx container to access ghost.

###nginx config
In nginx we just have to define a virtual host that will answer on port 80 (possible 443 as well if we need https) and if the requested domain is the one of our blog, then we tell nginx to forward that request to the ghost container. Here is how we do that.

**nginx.conf**
```
user www-data;
pid /var/run/nginx.pid;
worker_processes 1;

events {
    worker_connections 1024;
}

http {
  # Basic Settings
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 33;
  types_hash_max_size 2048;

  server_tokens off;
  server_names_hash_bucket_size 64;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  # Logging Settings
  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;
  # Gzip Settings
  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 3;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_types text/plain text/xml text/css application/x-javascript application/json;
  gzip_disable "MSIE [1-6]\.(?!.*SV1)";

  include /etc/nginx/conf.d/*.conf;
}
```

**ghost.conf**

```
upstream masimplo-web {
  server masimplo:2368;
}

server {
  listen 80;
  server_name masimplo.com www.masimplo.com;

  location / {
      proxy_pass         http://masimplo-web;
      proxy_http_version 1.1;
      proxy_redirect     off;
      proxy_set_header   Host $host;
      proxy_set_header   Connection 'upgrade';
      proxy_set_header   Upgrade $http_upgrade;
      proxy_set_header   X-Real-IP $remote_addr;
      proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Host $server_name;
      proxy_set_header   X-Forwarded-Proto $scheme;
      proxy_cache_bypass $http_upgrade;
  }
}
```

and finally **Dockerfile** inside `./proxy`
```
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ghost.conf /etc/nginx/conf.d/ghost.conf
```

and that's it. All you have to do now is write `docker compose up -d` and everything should be running. You can also do `docker ps` to make sure containers are running and the correct ports are used.
