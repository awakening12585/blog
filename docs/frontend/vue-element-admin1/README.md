# (一) 起步

## 安装vscode (开发工具)
### 下载安装
[vscode官网下载](https://code.visualstudio.com/Download)
### 汉化
打开vscode后
Windows、Linux 快捷键是：ctrl+shift+p
macOS 快捷键是：command + shift + p
搜索 Configure Language，选择 Configure Display Language 选项。
![图片](/blog/images/vscode/1.png)
> 选择 zh-cn 如果不存在,点击下面的安装其他语言(中文简体)即可
### 扩展推荐
点击下图所示,安装扩展,简化开发
![图片](/blog/images/vscode/2.png)

推荐安装一些好用的扩展
- Auto Close Tag 自动闭合HTML标签
- Auto Rename Tag 修改HTML标签时，自动修改匹配的标签
- Beautify 代码美化
- ESLint ESLint插件，高亮提示
- File Peek 根据路径字符串，快速定位到文件
- HTML CSS Support css提示（支持vue）
- HTMLHint HTML格式提示
- JavaScript (ES6) code snippets ES6语法代码段
- Vetur Vue代码高亮及补全
- VS Color Picker vs颜色选择器
- Vue 2 Snippets Vue2代码补全
- [vscode 插件和配置推荐](https://github.com/varHarrie/varharrie.github.io/issues/10)

## 安装vue-element-admin
### 地址
- [github地址](https://github.com/PanJiaChen/vue-element-admin)
- [github地址_i18n分支](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)
> i18n 分支提供国际化,我们这里使用的是 i18n

### 下载
```bash
# clone the project
git clone -b i18n git@github.com:PanJiaChen/vue-element-admin.git
```
### vscode打开项目文件夹
```bash
// 打开项目后
ctrl + shift + ` 打开终端
//查看是否为阿里源
nrm ls 
```
可以看到*在taobao的那一列，表示正在使用taobao镜像
![图片](/blog/images/vscode/3.png)
> 如果不是使用的taobao镜像,使用 nrm use taobao 切换至淘宝镜像

### 安装依赖及运行
```bash
//安装依赖
npm i
# 启动服务
npm run dev
```
