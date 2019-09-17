# confluence & postgresql
使用docker 部署nginx
## 路径约定
```
|--confluence
|----confluence-data        //confluence 数据目录
|----docker-compose.yml
|----logs                   //confluence 数据目录
|----pgsql-data             //pgsql 数据目录
```

## docker-compose.yml
```bash
version: '3.4'
services:
  confluence:
    image: cptactionhank/atlassian-confluence:latest
    container_name: confluence
    user: root
    ports:
      - "8090:8090"
      - "8091:8091"
    restart: always
    depends_on:
      - db
    volumes:
      - ./logs:/opt/atlassian/confluence/logs
      - ./confluence-data:/var/atlassian/confluence
  db:
    image: postgres:9.4
    container_name: confluence-db
    user: root
    ports:
      - "5432:5432"
    restart: always
    environment:
      - 'POSTGRES_USER=confluencedb'
      - 'POSTGRES_PASSWORD=密码'
      - 'POSTGRES_DB=confluencedb'
      - 'POSTGRES_ENCODING=UTF8'
      - 'POSTGRES_COLLATE=C'
      - 'POSTGRES_COLLATE_TYPE=C'
    volumes:
      - ./pgsql-data:/var/lib/postgresql/data
```
## 启动
```bash
docker-compose up -d
```
### 访问
```bash
访问IP:8090  记录下来server id
```
### 破解
[百度网盘连接](https://pan.baidu.com/s/1ndLa_8Ey461hyjhkAb_IgA) 提取码: v825 
```bash
//查看容器id
docker ps
//从容器中复制下来
sudo docker cp  d45ec455a4f7:/opt/atlassian/confluence/confluence/WEB-INF/lib/atlassian-extras-decoder-v2-3.4.1.jar ./atlassian-extras-2.4.jar
//下载到本地
sz atlassian-extras-2.4.jar
//解压破解工具压缩包后运行confluence_keygen.jar
1 输入name 和 server id
2 点击.gen 生成密钥并记录
3 点击.path 选择atlassian-extras-2.4.jar
4 破解成功同目录显示atlassian-extras-2.4.jar.bak
//把atlassian-extras-2.4.jar 文件上传到服务器
//然后复制到容器中
sudo docker cp  ./atlassian-extras-2.4.jar d45ec455a4f7:/opt/atlassian/confluence/confluence/WEB-INF/lib/atlassian-extras-decoder-v2-3.4.1.jar 
//停止重启
sudo docker-compose stop && sudo docker-compose start
```
## 创建pgsql数据库
> 上面docker-compose.yml 中已经配置了,下面操作可以不做
```bash
进入pgsql容器：docker exec -it xxxxxx bash  
psql -U postgres  
查询用户：\l
创建数据库：CREATE DATABASE confluence WITH OWNER postgres;  
退出：\q
```
### 配置 pg_hba.conf
```bash
//进入 pgsql-data 目录
cd pgsql-data
// 打开文件
vim pg_hba.conf
//在文件末尾
host all all all trust
// 重启数据库
docker restart 容器id
```
