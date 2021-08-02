# MongoDB 副本集搭建
- [官网](https://docs.mongodb.com/v4.4/tutorial/deploy-replica-set/)
- 本文以mongod 4.4 版本为例
- 在一台虚拟机上演示

## (1)利用systemctl 服务
- 复制官网安装时候自带的 mongod.service 到 /etc/systemd/system
- 可执行权限
```flow js
# * 替换为文件名称
chmod +x *.service
```

## (2)修改文件里面指定的 conf地址

## (3) 修改conf 配置文件

```flow js
# 指定副本集名称
replication:
   replSetName: "rs0"
```

## (4) 启动副本集
```flow js
rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "mongodb0.example.net:27017" },
      { _id: 1, host: "mongodb1.example.net:27017" },
      { _id: 2, host: "mongodb2.example.net:27017" }
   ]
})

```

## (5) 修改副本集权重
```flow js
conf = rs.config()			         #获取副本集的配置，默认权重都是1

conf.members[0].priority = 10	     #索引号从0开始，每次递增1，类似数组

conf.members[1].priority = 5

conf.members[2].priority = 2

rs.reconfig(conf)			        #更新mongodb副本集的配置，优先权重最高的提升为primary，关闭启动后也为主
```

## (6) 开启认证模式
- 创建用户
```flow js
db.createUser({user: "root", pwd: "Root#123", roles: [{role: "root", db: "admin"}]})
```

- 创建key文件
```flow js
[root@m1 mongodb]# cd /data/mongodb/27017/keyfile/
[root@m1 keyfile]# openssl rand -base64 756 > mongo.key
[root@m1 keyfile]# chmod 600 mongo.key # 必须修改为600权限，否则无法启动
```
> 以上完成后，将文件复制到另外2个节点

- 修改配置文件
```flow js
security:
 authorization: enabled
 clusterAuthMode: keyFile
 keyFile: /data/mongodb/27017/keyfile/mongo.key
```

- 重启后并用认证模式登陆
```flow js
mongo 127.0.0.1:27019 -u root -p 'Root#123' --authenticationDatabase admin
```
