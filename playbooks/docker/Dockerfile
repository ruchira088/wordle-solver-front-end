FROM nginx:stable-alpine

LABEL org.opencontainers.image.source https://github.com/ruchira088/wordle-solver-front-end

ADD ./playbooks/docker/default.conf /etc/nginx/conf.d/default.conf

ADD ./build /opt/wordle-solver

EXPOSE 80