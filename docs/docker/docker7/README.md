# Docker ubuntu16.04离线安装 docker
## 卸载
```bash
// 1.0
sudo apt-get purge docker-ce
// 2.0 删除安装目录
sudo rm -rf /var/lib/docker
```
## 安装
1. 下载
[docker-ce-cli_19.03.1_3-0_ubuntu-xenial_amd64.deb](https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/)
2. 查看依赖
```bash
dpkg --info *.deb | grep Depends
```
3. 下载相关依赖,并安装 [网址](https://ubuntu.pkgs.org)
```bash
// containerd.io_1.2.6-3_amd64.deb  docker-ce-cli_19.03.1_3-0_ubuntu-xenial_amd64.deb
dpkg -i containerd.io_1.2.6-3_amd64.deb
dpkg -i docker-ce-cli_19.03.1_3-0_ubuntu-xenial_amd64.deb
```
