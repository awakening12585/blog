# Docker Compose 安装与卸载
Compose 项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。从功能上看，跟 OpenStack 中的 Heat 十分类似。
## 下载二进制包
- 官方 [GitHub Release](https://github.com/docker/compose/releases) 处直接下载编译好的二进制文件。
- [百度网盘](https://pan.baidu.com/s/1olBoZxqou4xT9LUPfuvaIQ) 提取码: qr1t 

## 上传文件
将文件上传到 /usr/local/bin/ 目录
执行下面命令:
```bash
sudo chmod +x /usr/local/bin/docker-compose
//查看版本
docker-compose version 
```

## 卸载
二进制包方式安装的，删除二进制文件即可
```bash
sudo rm /usr/local/bin/docker-compose
```