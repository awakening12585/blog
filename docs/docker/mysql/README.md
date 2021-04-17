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
  mysql-5.7.29:
    restart: always
    image: "mysql:5.7.29"
    container_name: "Mysql-5.7.29-Pro"
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
## my.cnf
```
[mysqld]
user=mysql
default-storage-engine=INNODB
character-set-server=utf8
max_connections=2000
wait_timeout = 300
interactive_timeout = 500
lower_case_table_names=2
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```



## docker-compose(MySQL8)
```bash
version: '3.1'
services:
  mysql-8.0.19:
    container_name: "Mysql-8.0.19-Pro"
    image: "mysql:8.0.19"
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      TZ: Asia/Shanghai
    command:
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
      --max_allowed_packet=128M;
    ports:
      - 3306:3306
    volumes:
      - ./data:/var/lib/mysql
      - ./conf/my.cnf:/etc/mysql/my.cnf
```

## my.cnf

```flow js
[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# add
max_connections = 2000
wait_timeout = 300
interactive_timeout = 500

lower_case_table_names=1

sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

# Custom config should go here
!includedir /etc/mysql/conf.d/
```

## 启动
```bash
docker-compose up
```
