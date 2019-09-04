# linux 安装JDK
## ubuntu16.04
### 下载
- oracle下载jdk 1.8,[jdk-8u131-linux-x64.tar.gz](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- 网盘下载:[点击下载](https://pan.baidu.com/s/1qqhjy4GQmXiSLYUrMGjPgg), 提取码: f5uf

### 安装
1. 服务器创建jdk安装目录
```bash
mkdir -p /usr/java
```
2. 上传文件到服务器
3 解压
```bash
tar -zxvf jdk-8u221-linux-x64.tar.gz 
```
4. 配置系统环境变量
```bash
vim /etc/profile
```
将下面的代码放在profile文件的最后面
```
export JAVA_HOME=/usr/java/jdk1.8.0_221
export JRE_HOME={JAVA_HOME}/jre
export CLASSPATH=.:{JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=$JAVA_HOME/bin:$PATH
```
5. 更新配置文件生效
```bash
source /etc/profile
```
6. 版本查看
```bash
java -version
```
