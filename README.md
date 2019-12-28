# sec-to-insec

[![Docker Pulls](https://img.shields.io/docker/pulls/prouser123/sec-to-insec)
![Docker Arch](https://img.shields.io/badge/arch-amd64%20|%20arm/v6%20|%20arm/v7%20|%20arm64-blue)](https://hub.docker.com/r/prouser123/sec-to-insec/)

A NodeJS proxy to access HTTPS only websites over HTTP.


## Deploy (docker-compose)

```yaml
version: "3.3"

services:
  sec-to-insec:
    container_name: "sec-to-insec"
    image: prouser123/sec-to-insec:latest
    restart: unless-stopped
    environment:
      HOSTNAME: "insec"
    ports:
      - "80:80"
```

This will configure the program to respond to `*.insec` domain requests under port `80`.
