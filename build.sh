#!/bin/bash
git pull && docker build -t proposta-noshave:latest . && docker stack deploy -c docker-compose.yml proposta-noshave && docker service update --force --image proposta-noshave:latest proposta-noshave_proposta-noshave
