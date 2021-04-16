# 修改docker默认存储地址
docker中默认存放镜像和容器的目录是：/var/lib/docker/,我们常常遇到问题是服务器的系统盘很小导致磁盘空间不够,这里针对这个问题提供了解决方案
## 查看磁盘
```bash
查看服务器磁盘,找一个相对比较大的磁盘,这里已 /data 目录为例
df -h 
```
## 创建需要目录
```bash
mkdir -p /data/lib/docker_data
```
## 迁移数据
```bash
cp -R /var/lib/docker/* /data/lib/docker_data/
```
## 修改配置文件
```bash
//如果对应的目录/文件不存在新建即可
vim /etc/docker/daemon.json
//添加如下数据 data-root 默认地址
{
    "registry-mirrors": ["https://registry.docker-cn.com"],
    "data-root": "/data/lib/docker_data"
}

```
## 使配置生效
```bash
systemctl daemon-reloadreload
```
## 重启docker
```bash
systemctl restart docker  //重启
systemctl start docker  //启动
systemctl stop docker //停止
```
## 注意
- 如果操作完成后,在启动镜像容器时候失败,将镜像删除重新pull下来即可
