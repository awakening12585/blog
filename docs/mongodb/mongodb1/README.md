# MongoDB副本集搭建
## 一、MongoDB副本集简介
单节点的 <kbd>MongoDB</kbd> 在数据的安全和冗余方面是比较低的，在生产环境中，我们为 <kbd>MongoDB</kbd>  配置副本集，这样可以提高数据的高可用性和安全性。

副本集 ：是一组 <kbd>Mongod</kbd> 维护相同数据集的实例。副本集可以包含多个数据承载点和多个仲裁点。在承载数据的节点中，仅有一个节点被视为主节点，其他节点称为次节点。

* ==Primary 主节点，用于承担==
* ==Secondary 次节点==
* ==Arbiter 仲裁节点，也是属于次节点==

主节点接收所有的数据写入操作，主节点记录数据的所有更改，即<kbd>oplog</kbd>。

* 一个主节点两个次节点(一个<kbd>Secondary</kbd> 节点，一个<kbd>Arbiter</kbd> 节点)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191022114327217.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8yODg0NjM2Nw==,size_16,color_FFFFFF,t_70)
将一个额外的<kbd>mongod</kbd>实例添加到副本集作为 仲裁节点。仲裁节点不维护数据集。仲裁节点的目的是通过响应其他副本集成员的心跳和选举请求来维护副本集中的选举。因为它们不存储数据集，所以仲裁节点可以是提供副本集仲裁功能的好方法，其资源成本比具有数据集的全功能副本集成员更低。如果您的副本集具有偶数个成员，请添加仲裁者以避免脑裂出现。

* 主节点故障后重新选举主节点
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191022114550461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8yODg0NjM2Nw==,size_16,color_FFFFFF,t_70)
在主节点未与配置中的其它成员通信超过 10s(默认为10s)的话，则符合条件的次节点将推选自己为主节点。

**在选举成功完成之前，副本集无法处理写入操作。**

<kbd>[electionTimeoutMillis](https://docs.mongodb.com/manual/reference/replica-configuration/#rsconf.settings.electionTimeoutMillis)</kbd> 默认值为10000(10s) ，我们可以根据自己的项目情况来升高或者降低该值，我们在更改该值的时候需要考虑到网络延迟等因素。

默认情况下，副本集在选取新的主节点的等待时间不超过12秒(主要用于将原有主节点标记为不可用，并选举出新的主节点)。

为了保持次节点与主节点的数据同步，MongoDB 使用两种方式进行数据的同步：
* 初始同步， 用于同步主节点的所有数据
>初始同步将所有的数据从副本集的一个成员复制到另外一个成员
* 增量同步，在初始同步后不断复制新的数据
>在初始同步后不断复制数据，次节点从主节点中同步复制 Oplog，并在异步过程中应用这些操作

<kbd>[MongoDB-Oplog详解](https://www.cnblogs.com/operationhome/p/10688798.html)</kbd>

>副本集在部署前需要确定成员数据，副本集最多能有50个节点，但是只能有7个节点拥有被选举权，副本集需要具有奇数个投票成员，如果有偶数个的话，可以添加一个 仲裁者，来保证有奇数个成员，避免脑裂情况发生。
尽量使用 主机名 来寻找对应的节点，而不是使用 ip 地址，避免 ip 改变导致配置需要更改。

## 二、部署准备
<kbd>1.部署需要更改 /etc/hosts 文件，将主机名和 ip 地址对应好，不应该使用ip。
2.使用统一的端口。
3.创建数据储存的位置、日志储存位置和配置文件的位置。
4.确定好副本集的名称
5.提前生成keyfile文件
6.前往官网下载安装包（本次教程使用的是官网编译的包，解压直接使用）</kbd>

<kbd>[安装包下载地址](https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-4.0.13.tgz)</kbd>

* 配置服务器hosts文件

```powershell
vim /etc/hosts
test1 192.168.1.11(替换为真是ip)
test1 192.168.1.12(替换为真是ip)
test1 192.168.1.13(替换为真是ip)
```

* 将下载好的安装包上传至服务器并解压
>![在这里插入图片描述](https://img-blog.csdnimg.cn/20191022121949656.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8yODg0NjM2Nw==,size_16,color_FFFFFF,t_70)
>解压后将目录复制3份，分别命名为：mongodb-4.0.12-PRIMARY、mongodb-4.0.12-SECONDARY、mongodb-4.0.12-ARBITER，并将目录移动至/data目录下

==**注：本次搭建副本集为测试环境，在一台服务器上完成的搭建，如需在正式环境下搭建将其余两个节点分发至不同服务器即可**==

* 创建数据库相关目录
>提前创建好相关目录：db为数据库数据存储目录，logs为数据库日志存放目录，etc为数据库配置文件存放目录
```powershell
mkdir -p /data/mongodb-4.0.12-PRIMARY/{db,logs,etc}
mkdir -p /data/mongodb-4.0.12-SECONDARY/{db,logs,etc}
mkdir -p /data/mongodb-4.0.12-ARBITER/{db,logs,etc}
```

* 生成keyfile文件并将文件分发至3台服务器内数据库etc目录下

```powershell
openssl rand -base64 90 -out /data/tools/keyfile
```
* 更改三个节点的 <kbd>keyFile</kbd> 文件权限

```powershell
chmod 600 /data/mongodb-4.0.12-PRIMARY/etc/keyfile
chmod 600 /data/mongodb-4.0.12-SECONDARY/etc/keyfile
chmod 600 /data/mongodb-4.0.12-ARBITER/etc/keyfile
```

* 上述准备工作完成之后，首次启动通过命令方式分别启动数据库

```powershell
/data/mongodb-4.0.12-PRIMARY/bin/mongod --dbpath=/data/mongodb-4.0.12-PRIMARY/db --logpath=/data/mongodb-4.0.12-PRIMARY/logs/mongo.log --fork --port 27017
```
==**--dbpath:指定数据库存储位置
       --logpath:指定日志存放位置
       --fork:后台运行
       --port:指定运行端口，如不指定为默认端口27017**==
* 启动后匿名登录创建管理员账号

```powershell
/data/mongodb-4.0.12-PRIMARY/bin/mongo

use admin

db.createUser({user:"root",pwd:"密码",roles: [{ role: "root", db: "admin" }]})
```
==**3台数据库服务都需要使用此方法创建管理员用户**==

* 管理员用户创建成功后，重启MongoDB服务（首先kill掉MongoDB数据库服务,然后通过添加下方配置文件内容来启动服务）

```powershell
ps -ef | grep mongo | awk '{print $2}' | grep -v grep | xargs kill -9 

vim /data/mongodb-4.0.12-PRIMARY/etc/mongod.conf
```

```yaml
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /data/mongodb-4.0.12-PRIMARY/db
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /data/mongodb-4.0.12-PRIMARY/logs/mongodb.logs

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0


processManagement:
  fork: true

security:
  authorization: enabled
  keyFile: "/data/mongodb-4.0.12-PRIMARY/etc/keyfile"
 # clusterAuthMode: "keyFile"

#operationProfiling:

replication:
  replSetName: smart360

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
#auth=ture
```
==**3台服务器分别创建mongod.conf配置文件，内部参数根据自己实际目录而修改**==

* 配置文件编辑好后分别启动3台数据库

```powershell
/data/mongodb-4.0.12-PRIMARY/bin/mongo -f /data/mongodb-4.0.12-PRIMARY/etc/mongod.conf
```
* 通过管理员的身份登录数据库

```powershell
/data/mongodb-4.0.12-PRIMARY/bin/mongo localhost:27017/admin -u root -p
*输入创建管理员用户时的密码
```
* 创建副本集，主节点操作

```powershell
>rs.initiate({_id:'test',members: [{ _id: 0 , host: "test1:27017"}]})
{ "ok" : 1 } #(返回次结果表示创建成功)
#多次按下回车键，直到显示这个节点为Primary主节点
test:PRIMARY>
#接下来添加备节点
test:PRIMARY> rs.add('test2:27017')
{
    "ok" : 1,
    "operationTime" : Timestamp(1555663440, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1555663440, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
}
#添加仲裁节点
test:PRIMARY> rs.addArb("test3:27017")
{
    "ok" : 1,
    "operationTime" : Timestamp(1555663631, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1555663631, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
}
#查看当前配置
test:PRIMARY> rs.conf()
#查看各节点身份
test:PRIMARY> rs.status()
```
* 次节点数据库操作

```powershell
test:SECONDARY> show dbs;  # 我们发现无法读写
2019-10-22T14:40:40.852+0800 E QUERY    [js] Error: listDatabases failed:{
    "operationTime" : Timestamp(1555664675, 1),
    "ok" : 0,
    "errmsg" : "not master and slaveOk=false",
    "code" : 13435,
    "codeName" : "NotMasterNoSlaveOk",
    "$clusterTime" : {
        "clusterTime" : Timestamp(1555664675, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
} 
test:SECONDARY> rs.slaveOk()# 允许 次节点 进行读取
test:SECONDARY> show dbs;# 我们就可以查看到次节点的数据了
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
```



MongoDB副本集搭建
一、MongoDB副本集简介
单节点的 MongoDB 在数据的安全和冗余方面是比较低的，在生产环境中，我们为 MongoDB 配置副本集，这样可以提高数据的高可用性和安全性。

副本集 ：是一组 Mongod 维护相同数据集的实例。副本集可以包含多个数据承载点和多个仲裁点。在承载数据的节点中，仅有一个节点被视为主节点，其他节点称为次节点。

Primary 主节点，用于承担
Secondary 次节点
Arbiter 仲裁节点，也是属于次节点
主节点接收所有的数据写入操作，主节点记录数据的所有更改，即oplog。

一个主节点两个次节点(一个Secondary 节点，一个Arbiter 节点)
在这里插入图片描述
将一个额外的mongod实例添加到副本集作为 仲裁节点。仲裁节点不维护数据集。仲裁节点的目的是通过响应其他副本集成员的心跳和选举请求来维护副本集中的选举。因为它们不存储数据集，所以仲裁节点可以是提供副本集仲裁功能的好方法，其资源成本比具有数据集的全功能副本集成员更低。如果您的副本集具有偶数个成员，请添加仲裁者以避免脑裂出现。

主节点故障后重新选举主节点
在这里插入图片描述
在主节点未与配置中的其它成员通信超过 10s(默认为10s)的话，则符合条件的次节点将推选自己为主节点。

在选举成功完成之前，副本集无法处理写入操作。

electionTimeoutMillis 默认值为10000(10s) ，我们可以根据自己的项目情况来升高或者降低该值，我们在更改该值的时候需要考虑到网络延迟等因素。

默认情况下，副本集在选取新的主节点的等待时间不超过12秒(主要用于将原有主节点标记为不可用，并选举出新的主节点)。

为了保持次节点与主节点的数据同步，MongoDB 使用两种方式进行数据的同步：

初始同步， 用于同步主节点的所有数据
初始同步将所有的数据从副本集的一个成员复制到另外一个成员

增量同步，在初始同步后不断复制新的数据
在初始同步后不断复制数据，次节点从主节点中同步复制 Oplog，并在异步过程中应用这些操作

MongoDB-Oplog详解

副本集在部署前需要确定成员数据，副本集最多能有50个节点，但是只能有7个节点拥有被选举权，副本集需要具有奇数个投票成员，如果有偶数个的话，可以添加一个 仲裁者，来保证有奇数个成员，避免脑裂情况发生。
尽量使用 主机名 来寻找对应的节点，而不是使用 ip 地址，避免 ip 改变导致配置需要更改。

二、部署准备
1.部署需要更改 /etc/hosts 文件，将主机名和 ip 地址对应好，不应该使用ip。
2.使用统一的端口。
3.创建数据储存的位置、日志储存位置和配置文件的位置。
4.确定好副本集的名称
5.提前生成keyfile文件
6.前往官网下载安装包（本次教程使用的是官网编译的包，解压直接使用）

安装包下载地址

配置服务器hosts文件
vim /etc/hosts
test1 192.168.1.11(替换为真是ip)
test1 192.168.1.12(替换为真是ip)
test1 192.168.1.13(替换为真是ip)
将下载好的安装包上传至服务器并解压
在这里插入图片描述
解压后将目录复制3份，分别命名为：mongodb-4.0.12-PRIMARY、mongodb-4.0.12-SECONDARY、mongodb-4.0.12-ARBITER，并将目录移动至/data目录下

注：本次搭建副本集为测试环境，在一台服务器上完成的搭建，如需在正式环境下搭建将其余两个节点分发至不同服务器即可

创建数据库相关目录
提前创建好相关目录：db为数据库数据存储目录，logs为数据库日志存放目录，etc为数据库配置文件存放目录

mkdir -p /data/mongodb-4.0.12-PRIMARY/{db,logs,etc}
mkdir -p /data/mongodb-4.0.12-SECONDARY/{db,logs,etc}
mkdir -p /data/mongodb-4.0.12-ARBITER/{db,logs,etc}
生成keyfile文件并将文件分发至3台服务器内数据库etc目录下
openssl rand -base64 90 -out /data/tools/keyfile
更改三个节点的 keyFile 文件权限
chmod 600 /data/mongodb-4.0.12-PRIMARY/etc/keyfile
chmod 600 /data/mongodb-4.0.12-SECONDARY/etc/keyfile
chmod 600 /data/mongodb-4.0.12-ARBITER/etc/keyfile
上述准备工作完成之后，首次启动通过命令方式分别启动数据库
/data/mongodb-4.0.12-PRIMARY/bin/mongod --dbpath=/data/mongodb-4.0.12-PRIMARY/db --logpath=/data/mongodb-4.0.12-PRIMARY/logs/mongo.log --fork --port 27017
–dbpath:指定数据库存储位置
–logpath:指定日志存放位置
–fork:后台运行
–port:指定运行端口，如不指定为默认端口27017

启动后匿名登录创建管理员账号
/data/mongodb-4.0.12-PRIMARY/bin/mongo

use admin

db.createUser({user:"root",pwd:"密码",roles: [{ role: "root", db: "admin" }]})
3台数据库服务都需要使用此方法创建管理员用户

管理员用户创建成功后，重启MongoDB服务（首先kill掉MongoDB数据库服务,然后通过添加下方配置文件内容来启动服务）
ps -ef | grep mongo | awk '{print $2}' | grep -v grep | xargs kill -9 

vim /data/mongodb-4.0.12-PRIMARY/etc/mongod.conf
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /data/mongodb-4.0.12-PRIMARY/db
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /data/mongodb-4.0.12-PRIMARY/logs/mongodb.logs

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0


processManagement:
  fork: true

security:
  authorization: enabled
  keyFile: "/data/mongodb-4.0.12-PRIMARY/etc/keyfile"
 # clusterAuthMode: "keyFile"

#operationProfiling:

replication:
  replSetName: smart360

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
#auth=ture
3台服务器分别创建mongod.conf配置文件，内部参数根据自己实际目录而修改

配置文件编辑好后分别启动3台数据库
/data/mongodb-4.0.12-PRIMARY/bin/mongo -f /data/mongodb-4.0.12-PRIMARY/etc/mongod.conf
通过管理员的身份登录数据库
/data/mongodb-4.0.12-PRIMARY/bin/mongo localhost:27017/admin -u root -p
*输入创建管理员用户时的密码
创建副本集，主节点操作
>rs.initiate({_id:'test',members: [{ _id: 0 , host: "test1:27017"}]})
{ "ok" : 1 } #(返回次结果表示创建成功)
#多次按下回车键，直到显示这个节点为Primary主节点
test:PRIMARY>
#接下来添加备节点
test:PRIMARY> rs.add('test2:27017')
{
    "ok" : 1,
    "operationTime" : Timestamp(1555663440, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1555663440, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
}
#添加仲裁节点
test:PRIMARY> rs.addArb("test3:27017")
{
    "ok" : 1,
    "operationTime" : Timestamp(1555663631, 1),
    "$clusterTime" : {
        "clusterTime" : Timestamp(1555663631, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
}
#查看当前配置
test:PRIMARY> rs.conf()
#查看各节点身份
test:PRIMARY> rs.status()
次节点数据库操作
test:SECONDARY> show dbs;  # 我们发现无法读写
2019-10-22T14:40:40.852+0800 E QUERY    [js] Error: listDatabases failed:{
    "operationTime" : Timestamp(1555664675, 1),
    "ok" : 0,
    "errmsg" : "not master and slaveOk=false",
    "code" : 13435,
    "codeName" : "NotMasterNoSlaveOk",
    "$clusterTime" : {
        "clusterTime" : Timestamp(1555664675, 1),
        "signature" : {
            "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
            "keyId" : NumberLong(0)
        }
    }
} 
test:SECONDARY> rs.slaveOk()# 允许 次节点 进行读取
test:SECONDARY> show dbs;# 我们就可以查看到次节点的数据了
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
Markdown 5730 字数 240 行数 当前行 235, 当前列 15 文章已保存14:43:06HTML 4452 字数 161 段落
