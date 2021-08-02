# MongoDB安装
- [官网](https://docs.mongodb.com/v4.4/tutorial/install-mongodb-on-ubuntu/)
- 本文以mongod 4.4 版本为例
## (1)导入包管理系统使用的公钥。
- 从终端发出以下命令以从https://www.mongodb.org/static/pgp/server-4.4.asc导入 MongoDB 公共 GPG 密钥：

```
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
//该操作应以OK. 
```

>如果您收到指示gnupg未安装的错误
- (1)gnupg使用以下命令安装及其所需的库：
```
sudo apt-get install gnupg
```
- (2)安装后，重试导入密钥：
```sh
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

## (2) 为 MongoDB 创建一个列表文件。
> 以下说明适用于Ubuntu 18.04 (Bionic)
```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

## (3) 重新加载本地包数据库
```flow js
sudo apt-get update
```

## (4) 安装 MongoDB 包
```flow js
sudo apt-get install -y mongodb-org
```
## (5) 启动 MongoDB
```
sudo systemctl start mongod
```
> 如果您在启动时收到类似于以下内容的错误 mongod：Failed to start mongod.service: Unit mongod.service not found.
> 首先运行以下命令：
                      
```flow js
sudo systemctl daemon-reload
```
> 然后再次运行上面的启动命令。

## 常用命令
- 查看状态
```flow js
sudo systemctl status mongod
```

- 停用
```flow js
sudo systemctl stop mongod
```

- 重启
```flow js
sudo systemctl restart mongod
```

- 开机自启
```flow js
systemctl enable *.service
```

- 关闭开机自启
```flow js
systemctl disable *.service
```
