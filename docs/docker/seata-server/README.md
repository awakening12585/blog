# seata-server
## 创建目录
```bash
mkdir -p /data/docker/seata-server
cd /data/docker/seata-server
```

## docker-compose
```bash
version: "3.2"
services:
  # 分布式事务服务
  seata-server:
      image: seataio/seata-server
      container_name: seata-server
      ports:
          - "8091:8091"
      environment:
          #宿主机ip
          - SEATA_IP=192.168.128.101
          - SEATA_PORT=8091
          #- STORE_MODE=db
      #volumes:
          # 第5步编写的registry.conf
          #- "./config/registry.conf:/seata-server/resources/registry.conf"
          # 第4步下载的mysql8引擎jar包
          #- "./mysql-connector-java-8.0.21.jar:/seata-server/libs/mysql-connector-java-8.0.21.jar"
          # 日志文件夹
          #- "./logs:/root/logs/seata"
```

## 启动
```bash
docker-compose up
```

