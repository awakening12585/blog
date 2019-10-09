# Docker 创建镜像、修改、上传镜像
创建镜像有很多方法，用户可以从 Docker Hub 获取已有镜像并更新，也可以利用本地文件系统创建一个。
## 创建镜像
### 利用已有镜像,创建新的镜像
1. 获取镜像,从docker hub 或私有仓库获取镜像
2. 交互模式启动容器
```bash
docker run -it [镜像名] /bin/bash
```
3. 进入容器后,安装或做其他操作
4. exit 退出容器,使用docker commit 命令提交更新后的副本
```bash
sudo docker commit -m "Added json" -a "Docker Newbee" [运行容器id] [镜像名称]:[tag]
```
> -m 来指定提交的说明信息，跟我们使用的版本控制工具一样；-a 可以指定更新的用户信息；之后是用来创建镜像的容器的 ID；最后指定目标镜像的仓库名和 tag 信息。创建成功后会返回这个镜像的 ID 信息。
5. 使用 docker images 查看新创建的镜像
### 基于本地模板导入
服务器并非都是有公网的,那么如何将镜像上传到没有公网的服务器呢?
1. 保存镜像为文件
如果要讲镜像保存为本地文件，可以使用Docker save命令。
```bash
//命令格式：docker save -o 要保存的文件名  要保存的镜像
docker save -o java8.tar lwieske/java-8
//查看
ls -al 或者 ll
```
2. 从文件载入镜像
从文件载入镜像可以使用Docker load命令。
```bash
//命令格式：docker load --input 文件 或者 docker load < 文件名
docker load < java8.tar
//查看 
docker images
```
### 基于Dockerfile创建
改天再写

## 修改镜像名称
1. 查看
```bash
docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
pujh/centos         tomcat-centos       70ff7873d7cd        About an hour ago   612 MB
docker.io/centos    latest              9f38484d220f        11 days ago         202 MB
```
2. 修改镜像名称
```bash
docker tag 70ff7873d7cd my_centos:tomcat-centos
docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my_centos           tomcat-centos       70ff7873d7cd        About an hour ago   612 MB
pujh/centos         tomcat-centos       70ff7873d7cd        About an hour ago   612 MB
docker.io/centos    latest              9f38484d220f        11 days ago         202 MB
```
3. 删除
```bash
docker rmi 70ff7873d7cd

Error response from daemon: conflict: unable to delete 70ff7873d7cd (cannot be forced) - image is being used by running container 70859e710147
```
> 因为新的镜像和旧镜像id一样,所以不能使用id删除,会出现上述错误

4. 使用 docker rmi [镜像名]:[tag]
```bash
docker rmi pujh/centos:tomcat-centos
```

## 上传镜像
1. dockerhub 创建账户及仓库
2. docker login 登陆
3. docker push [仓库名]:[tag]
