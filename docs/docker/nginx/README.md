# nginx
使用docker 部署nginx
## 路径约定
- www 目录:前端项目
- conf 目录: 配置文件
  - conf.d 目录:每个项目对应的nginx文件
    - certs 目录:https认证文件
    - web1.conf 文件:项目1的nginx配置文件
    - web2.conf 文件:项目1的nginx配置文件
  - nginx.conf 文件:nginx配置文件
- log 目录: nginx日志
- docker-compose.yml 文件
## 创建目录
```bash
//创建nginx主目录
mkdir -p /usr/local/docker/nginx
cd /usr/local/docker/nginx
mkdir www && mkdir log && mkdir -p conf/conf.d/certs
```
## docker-compose.yml
```bash
version: "3"
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./www/:/var/www/html/:rw
      - ./conf/conf.d:/etc/nginx/conf.d/:ro
      - ./conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./log/:/var/log/nginxlog/:rw
    networks:
      - net-nginx
networks:
  net-nginx:
```
## nginx.conf
```bash
user  nginx;
worker_processes  1;
pid        /var/run/nginx.pid;
error_log  /var/log/nginxlog/nginx.error.log warn;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /dev/null;
    #access_log  /var/log/nginxlog/nginx.access.log  main;

    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;
    #gzip  on;
    include /etc/nginx/conf.d/*.conf;
}
```

## web1.conf(site1项目示例)
```bash
server {
    listen       80;
    server_name  localhost www.site1.com;
    root   /var/www/html/site1;
    index  index.html index.htm;
    #charset koi8-r;
    
    access_log /dev/null;
    #access_log  /var/log/nginxlog/nginx.site1.access.log  main;
    error_log  /var/log/nginxlog/nginx.site1.error.log  warn;
    
    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
## web1.conf (https)
```bash
server {
    listen 80;
    server_name site2.com www.site2.com;
    add_header Strict-Transport-Security max-age=31536000;
    return 301 https://www.site2.com$request_uri;
}

server {
    listen       443 ssl http2;
    server_name  www.site2.com;
    root   /var/www/html/site2;
    index  index.php index.html index.htm;
    #charset koi8-r;
    
    access_log /dev/null;
    #access_log  /var/log/nginxlog/nginx.site2.access.log  main;
    error_log  /var/log/nginxlog/nginx.site2.error.log  warn;

    #error_page  404              /404.html;

    ssl on;
    ssl_certificate /etc/nginx/conf.d/certs/site2/www.site2.com.crt;
    ssl_certificate_key /etc/nginx/conf.d/certs/site2/www.site2.com.key;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4";
    add_header Strict-Transport-Security max-age=31536000;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    location ~ \.php$ {
        fastcgi_pass   php:9000;
        fastcgi_index  index.php;
        include        fastcgi_params;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

## 创建测试项目
在www目录创建 site1 目录
```bash
mkdir sitel
vim index.html
```
### index.html
```bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
test
</body>
</html>
```
### 启动
```bash
docker-compose up 
```
### 测试访问
页面显示test即为成功