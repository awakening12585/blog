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

### 配置DNS
#### 修改配置文件
```bash
vim /etc/resolvconf/resolv.conf.d/base
# 加入
nameserver x.x.x.x
```
#### DNS生效
```bash
sudo /etc/init.d/resolvconf restart
```

### 服务器重启
```bash
reboot
```

## ubuntu18.04

### 查看网络配置
```
vim /etc/netplan/01-netcfg.yaml
```

### 修改配置
```flow js
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33: #配置的网卡名称
      dhcp4: no #dhcp4关闭
      dhcp6: no #dhcp6关闭
      addresses: [192.168.128.25/24] #设置本机IP及掩码
      gateway4: 192.168.128.2 #设置网关(vmware 通过编辑 在虚拟网络配置 nat设置里面可以看到)
      nameservers:
        addresses: [192.168.128.2] #设置DNS
```

### 配置生效
```flow js
netplan apply
```

### ping测试
```flow js
ping www.baidu.com
```
## centos7
```flow js
# 进入网络配置文件目录
cd  /etc/sysconfig/network-scripts/

# 编辑配置文件，添加修改以下内容
vi  ifcfg-eno16777736  

# 编辑配置文件，添加修改以下内容
HWADDR=00:0C:29:8D:24:73
TYPE=Ethernet
BOOTPROTO=static  #启用静态IP地址
DEFROUTE=yes
PEERDNS=yes
PEERROUTES=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_FAILURE_FATAL=no
NAME=eno16777736
UUID=ae0965e7-22b9-45aa-8ec9-3f0a20a85d11
ONBOOT=yes  #开启自动启用网络连接
IPADDR0=192.168.21.128  #设置IP地址
PREFIXO0=24  #设置子网掩码
GATEWAY0=192.168.21.2  #设置网关
DNS1=8.8.8.8  #设置主DNS
DNS2=8.8.4.4  #设置备DNS

# 重启网络
service network restart   
```
