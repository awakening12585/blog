# sbt-scala-play-mongodb-vue
使用docker-compose 部署 sbt-scala-play-mongodb-vue 项目
## 路径约定
- cs 目录:后端项目
  - conf 目录:后端项目配置文件
- nginx 目录: nginx 相关文件 
- mongodb 目录: 数据库
- docker-compose.yml 文件
## Dockerfile (sbt-scala-play 项目镜像制作)
```bash
FROM ysihaoy/scala-play:2.12.2-2.6.0-sbt-0.13.15

# caching dependencies
COPY ["build.sbt", "/tmp/build/"]
COPY ["project/plugins.sbt", "project/build.properties", "/tmp/build/project/"]
RUN cd /tmp/build && \
 sbt compile && \
 sbt test:compile && \
 rm -rf /tmp/build

# copy code
COPY . /root/app/
WORKDIR /root/app
RUN sbt compile && sbt test:compile

EXPOSE 9000
CMD ["sbt run"]
```
## docker-compose.yml
```bash
version: "3"
services:
  nginx:
    image: nginx:alpine
    container_name: ng
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /data/excel:/data/excel:rw
      - ./nginx/www/:/var/www/html/:rw
      - ./nginx/conf/conf.d:/etc/nginx/conf.d/:ro
      - ./nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/log/:/var/log/nginxlog/:rw
    networks:
      nn:
        ipv4_address: 192.168.5.101


  redis-server:
    image: redis:latest
    container_name: rd
    ports:
      - 6379:6379
    restart: always
    networks:
      nn:
        ipv4_address: 192.168.5.102
        
  mongo:
    image: mongo:4.0.1
    container_name: md
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=test
      - MONGO_INITDB_ROOT_PASSWORD=test123
      - MONGO_INITDB_DATABASE=cs
    volumes:
      - "./mongodb/data/db/:/data/db"
      - "./mongodb/setup:/docker-entrypoint-initdb.d/"
    command: ["mongod","--bind_ip","0.0.0.0"]
    networks:
      nn:
        ipv4_address: 192.168.5.103

  cs:
    image: cs:1.0.1
    container_name: cs
    ports:
      - "9000:9000"
    volumes:
      - ./cs/conf:/root/app/conf
      - /data/excel:/data/excel:rw
    command:
      - sh
      - -c
      - ls && cd /root/app && sbt compile && sbt run
    tty: true
    depends_on:
      - mongo
    networks:
      nn:
        ipv4_address: 192.168.5.104

  cs_schedule:
    image: cs_schedule:1.0.0
    container_name: cs_schedule
    ports:
      - "9001:9000"
    volumes:
      - ./cs_schedule/conf:/root/app/conf
    command:
      - sh
      - -c
      - ls && cd /root/app && sbt compile && sbt run
    tty: true
    depends_on:
      - mongo
    networks:
      nn:
        ipv4_address: 192.168.5.105

networks:
  nn:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 192.168.5.0/24
```
## cs.conf
```bash

server {
    listen       80;
    server_name  leads.taoche360.cn;
    root   /var/www/html/cs;
    index  index.html index.htm;
    #charset koi8-r;

    #access_log /dev/null;
    access_log  /var/log/nginxlog/nginx.cs.access.log  main;
    error_log  /var/log/nginxlog/nginx.cs.error.log  warn;

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    location / {
       #root   html;
       #index  index.html index.htm;
       #动态页面
       if ( !-e $request_filename ){
            proxy_pass    http://192.168.5.104:9000;
        }
    }
    location ^~// {
                proxy_pass   http://192.168.5.104:9000;
    }
    location ^~ /data/excel {
                alias /data/excel/;
                autoindex on;
                autoindex_exact_size off;
                autoindex_localtime on;
    }
}
``` 
## play 配置跨域 options 访问
```bash
play.filters.enabled += "play.filters.cors.CORSFilter"

play.filters.cors {
  pathPrefixes = ["/"]
  allowedOrigins = ["http://**.**.cn"]
  allowedHttpMethods = ["GET", "POST" ,"OPTIONS"]
  allowedHttpHeaders = ["Accept"]
  preflightMaxAge = 1 days
}
```

## play 配置请求头
```bash
play.filters.csrf.header.bypassHeaders {
  X-XSRF-TOKEN = "*"
  Security-Magic = "true"
  Csrf-Token = "nocheck"
}
```


