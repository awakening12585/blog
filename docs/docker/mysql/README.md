# mysql
## 创建mysql目录
```bash
mkdir -p /usr/local/docker/mysql
cd /usr/local/docker/mysql
```
## 路径约定
- conf
  - my.cnf 存放自定义的配置文件
- db 用来存放了数据库表文件
- init
  - init.sql 存放初始化的脚本
## docker-compose (MySQL5)
```bash
version: '3.1'
services:
  mysql:
    restart: always
    image: mysql:5.7.22
    container_name: mysql
    ports:
      - 3306:3306
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123456
    command:
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
      --max_allowed_packet=128M
      --sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO"
    volumes:
      - "./db:/var/lib/mysql"
      - "./conf/my.cnf:/etc/my.cnf"
      - "./init:/docker-entrypoint-initdb.d/"
```

## docker-compose(MySQL8)
```bash
version: '3.1'
services:
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    command:
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
    ports:
      - 3306:3306
    volumes:
      - ./data:/var/lib/mysql
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

## 启动
```bash
docker-compose up
```