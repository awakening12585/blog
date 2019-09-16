# linux 配置网络

## ubuntu16.04
### 查看网卡
```bash
ifconfig
# 如果只有lo 本地回环
ifconfig -a  //查看所有网卡列表, 找到对应网卡
ifconfig enp3s0 up //启动
```
### 修改ip地址
```bash
vim /etc/network/interfaces

auto ens32
iface ens32 inet static
address 172.16.255.118
netmask 255.255.255.0
gateway 172.16.255.1
```
### 使网卡配置生效
```bash
sudo /etc/init.d/networking restart
```

## 配置DNS
### 修改配置文件
```bash
vim /etc/resolvconf/resolv.conf.d/base
# 加入
nameserver x.x.x.x
```
### DNS生效
```bash
sudo /etc/init.d/resolvconf restart
```

## 服务器重启
```bash
reboot
```
