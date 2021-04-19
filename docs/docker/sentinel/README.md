# sentinel
## 创建目录
```bash
mkdir -p /data/docker/sentinel
cd /data/docker/sentinel
```

## docker-compose
```bash
version: '3'
services:
  sentinel:
    image: bladex/sentinel-dashboard
    container_name: sentinel
    restart: always
    ports:
      - 8858:8858
```

## 启动
```bash
docker-compose up
```

## 访问
- http://ip:8858
- 账号密码 sentinel
