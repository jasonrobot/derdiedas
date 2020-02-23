FROM crystallang/crystal:latest-alpine

WORKDIR /src

# build the server

COPY ./server .
RUN ["crystal", "build", "src/server.cr"]
RUN ["ls"]

# add the files to serve

COPY ./index.html .
COPY ./dist/ ./dist

EXPOSE 80

CMD ["./server"]
# CMD ["ls", "-R"]
