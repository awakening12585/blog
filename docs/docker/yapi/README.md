# yapi
[gitee](https://gitee.com/fjc0k/docker-YApi#git-readme)

- yapi跨域问题:低版本的yapi确实存在跨域问题，但是现在官方出了一个google插件，所以不用nginx解决了所以可以不用搞了

## 创建目录
```bash
mkdir -p /data/docker/yapi
cd /data/docker/yapi
```

## docker-compose
```bash
version: '3'
services:
  yapi-web:
    image: jayfong/yapi:latest
    container_name: yapi-web
    ports:
      - 3000:3000
   # volumes:
   #  - ./config.json:/yapi/config.json
    environment:
      - YAPI_ADMIN_ACCOUNT=admin@juneyaoair.com
      - YAPI_ADMIN_PASSWORD=admin
      - YAPI_CLOSE_REGISTER=true
      - YAPI_DB_SERVERNAME=yapi-mongo
      - YAPI_DB_PORT=27017
      - YAPI_DB_DATABASE=yapi
      - YAPI_MAIL_ENABLE=true
      - YAPI_LDAP_LOGIN_ENABLE=true
      - YAPI_PLUGINS=[]
    depends_on:
      - yapi-mongo
    privileged: true
    restart: always
    networks:
      - yapi-net
  yapi-mongo:
    image: mongo:latest
    container_name: yapi-mongo
    volumes:
      - ./data/db:/data/db
    expose:
      - 27017
	depends_on:
      - yapi-nginx
    privileged: true
    restart: always
    networks:
      - yapi-net
  yapi-nginx:
    image: nginx:latest
    container_name: yapi-nginx
    privileged: true
	restart: always
    ports:
      - 80:80
    environment:
      - NGINX_PORT=80
    networks:
      - yapi-net
    volumes:
      - ./nginx/configs/:/etc/nginx/conf.d/
networks:
  yapi-net:
    driver: bridge
```

## nginx.conf
```
# cat nginx.conf
server {
    listen       80;
    server_name localhost;
   # access_log  /data/log/nginx/yapi/access.log main;

    location / {
      proxy_pass  http://yapi-web:3000;
      proxy_set_header Host $host;
      proxy_set_header  X-Real-IP        $remote_addr;
      proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header X-NginX-Proxy true;
      proxy_set_header Connection "upgrade";
      proxy_set_header Upgrade $http_upgrade;
    }
}
```

## 启动
```bash
docker-compose up
```

