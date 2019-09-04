# linux 安装Git
## ubuntu16.04

### 通过APT源安装Git命令行工具
```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install git
```
### 版本查看
```bash
git --version
```
### 配置用户邮箱
```bash
git config --global user.name "****"
git config --global user.email "***@qq.com"
```

### 生成公钥密钥
用ssh-keygen命令在个人文件夹下生成公钥密钥
```bash
cd ~/ && ssh-keygen -t rsa -C "你的邮箱"
cd .ssh
``` 
