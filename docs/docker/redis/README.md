# redis
## 创建mysql目录
```bash
mkdir -p /data/docker/redis
cd /data/docker/redis
```
## 路径约定
- conf
  - redis.conf 存放自定义的配置文件
- data 用来存放了数据
## docker-compose
```bash
version: '3'
  
services:
  redis:
    image: redis
    container_name: redis
    hostname: redis
    restart: always
    ports:
      - 16379:6379
    networks:
      - net_db
    volumes:
      - ./conf/redis.conf:/etc/redis/redis.conf:rw
      - ./data:/data:rw
    command:
      redis-server /etc/redis/redis.conf --appendonly yes
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8

networks:
  net_db:
    driver: bridge
```

## redis.conf
```
requirepass 123456
#daemonize yes
bind 0.0.0.0
appendonly yes
```

## 启动
```bash
docker-compose up
```
