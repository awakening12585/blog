# docker 容器和宿主机时间同步设置
## docker-compose 方式
通过同步以下文件,达到同步时间目的
```bash
volumes:
  - /etc/timezone:/etc/timezone
  - /etc/localtime:/etc/localtime
```

## docker 启动
创建容器的时候指定启动参数，挂载localtime文件到容器内，保证两者所采用的时区是一致的。
```bash
docker run -ti -d --name my-nginx -v /etc/localtime:/etc/localtime:ro  docker.io/nginx  /bin/bash
```

## dockerfile 创建镜像
创建dockerfile文件的时候，自定义该镜像的时间格式及时区。在dockerfile文件里添加下面内容
```bash
FROM tomcat
ENV CATALINA_HOME /usr/local/tomcat
.......
#设置时区
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone 
```
