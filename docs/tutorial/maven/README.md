# linux 安装maven
## ubuntu16.04
### 下载
- 官网下载[下载地址](http://maven.apache.org/download.cgi)
- 网盘下载:[点击下载](https://pan.baidu.com/s/1-iSx7PUgn5mFBUMGky79pw), 提取码: hhie
### 安装
1. 服务器创建jdk安装目录
```bash
mkdir -p /usr/maven
```
2. 上传文件到服务器
3 解压
```bash
tar -zxvf apache-maven-3.6.1-bin.tar.gz 
```
4. 配置系统环境变量
```bash
vim /etc/profile
```
将下面的代码放在profile文件的最后面
```
//新增行MAVEN_HOME,等于号后面是maven解压的文件夹地址
export MAVEN_HOME=/usr/maven/apache-maven-3.6.1
//找到PATH行,追加
$MAVEN_HOME/bin
```
5. 更新配置文件生效
```bash
source /etc/profile
```
6. 版本查看
```bash
mvn -v
```