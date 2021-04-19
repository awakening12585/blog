# mongodb
使用docker-compose 部署mongodb
## 路径约定
- data 目录:存放mongodb数据
- setup 目录: 
  - mongdbInit.sh 初始化脚本
- docker-compose.yml 文件
## 创建目录
```bash
//创建mongodb主目录
mkdir -p /usr/local/docker/mongodb
cd /usr/local/docker/mongodb
mkdir data && mkdir setup
```
## docker-compose.yml
```bash
version: "3"
services:
  mongo:
    image: mongo:4.0.1
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      - TZ=Asia/Shanghai
      - MONGO_INITDB_ROOT_USERNAME=test
      - MONGO_INITDB_ROOT_PASSWORD=test123
      - MONGO_INITDB_DATABASE=cs
    volumes:
      - "./data/db/:/data/db"
      - "./setup:/docker-entrypoint-initdb.d/"
    command: ["mongod","--bind_ip","0.0.0.0"]
```
## mongdbInit.sh
```bash
echo "Creating mongo users"
mongo admin --host localhost -u test -p test123 --eval "db.createUser({user: 'admin',pwd: 'admin123',roles: [{ role: 'dbAdminAnyDatabase', db: 'admin'}]});"
mongo admin -u admin -p admin123 << EOF
db = db.getSiblingDB('cs'); 
db.createUser({user: 'cs',pwd: 'cs360',roles: [{ role: "readWrite", db: "cs"}]})
db.createCollection("cs");
EOF
echo "Mongo users created"
```
## 启动
```bash
docker-compose up -d
```
## mongoDb用户角色权限说明
- 数据库用户角色 read、readWrite
- 数据库管理角色 dbAdmin、dbOwner、userAdmin
- 集群管理角色 clusterAdmin、clusterManager、clusterMonitor、 hostManager
- 备份恢复角色 backup、restore
- 所有数据库角色 readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
- 超级用户角色 root
- 内部角色 __system
### 角色说明
- Read 允许用户读取指定数据库
- readWrite 允许用户读写指定数据库
- dbAdmin 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
- userAdmin 允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
- clusterAdmin 只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
- readAnyDatabase 只在admin数据库中可用，赋予用户所有数据库的读权限
- readWriteAnyDatabase 只在admin数据库中可用，赋予用户所有数据库的读写权限
- userAdminAnyDatabase 只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
- dbAdminAnyDatabase 只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
- root 只在admin数据库中可用。超级账号，超级权限
至此mongoDb数据库据安装好了，可以愉快的玩耍使用了
