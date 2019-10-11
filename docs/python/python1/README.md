# python 学习第一天
## 安装python解释器
- [Python官方网站](https://www.python.org/downloads/)下载
- 找到安装文件 Windows x86-64 executable installer 点击下载
- 安装过程建议勾选“Add Python 3.x to PATH”（将Python 3.x添加到PATH环境变量）并选择自定义安装
- 在设置“Optional Features”界面最好将“pip”、“tcl/tk”、“Python test suite”等项全部勾选上
- 如果系统显示api-ms-win-crt*.dll文件缺失，可以参照[api-ms-win-crt*.dll缺失原因分析和解决方法](https://zhuanlan.zhihu.com/p/32087135)
- 如果是因为更新Windows的DirectX之后导致某些动态链接库文件缺失问题，可以下载一个DirectX修复工具进行修复
- 验证是否安装成功 python --version
> 需要注意的是如果在Windows 7环境下安装Python 3.x，需要先安装Service Pack 1补丁包（可以通过一些工具软件自动安装系统补丁的功能来安装)

## python开发工具(PyCharm)
### 下载
[PyCharm官网下载](http://www.jetbrains.com/pycharm/download/#section=windows)
### 安装
安装
### 破解
1. 下载[破解文件](https://pan.baidu.com/s/1ps4_CGWt0gwnYklA7aUxxQ) 提取码: cgah 
2. 把jetbrains-agent.jar放到bin目录下，其他目录也可以，目录不要出现中文
3. 进入edit custom vm options
4. 更改文件
5. 保存关闭并重新打开软件
