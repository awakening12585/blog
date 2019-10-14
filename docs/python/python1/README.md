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
![图片](/blog/images/python/1.png)
![图片](/blog/images/python/2.png)
![图片](/blog/images/python/3.png)
![图片](/blog/images/python/4.png)
4. 保存关闭并重新打开软件

## 注释
- 单行注释
```bash
# 注释内容
```
- 多行注释
```bash
"""
    第一行注释
    第二行注释
    第三行注释
"""
或者 单引号也可以
```
## 变量
### 数据类型
Python中的数据类型很多，而且也允许我们自定义新的数据类型，我们先介绍几种常用的数据类型
- 整形: Python中可以处理任意大小的整数（Python 2.x中有int和long两种类型的整数，但这种区分对Python来说意义不大，因此在Python 3.x中整数只有int这一种了），而且支持二进制（如0b100，换算成十进制是4）、八进制（如0o100，换算成十进制是64）、十进制（100）和十六进制（0x100，换算成十进制是256）的表示法
- 浮点型: 浮点数也就是小数，之所以称为浮点数，是因为按照科学记数法表示时，一个浮点数的小数点位置是可变的，浮点数除了数学写法（如123.456）之外还支持科学计数法（如1.23456e2）
- 字符串型: 字符串是以单引号或双引号括起来的任意文本，比如'hello'和"hello",字符串还有原始字符串表示法、字节字符串表示法、Unicode字符串表示法，而且可以书写成多行的形式（用三个单引号或三个双引号开头，三个单引号或三个双引号结尾）
- 布尔型: 布尔值只有True、False两种值，要么是True，要么是False，在Python中，可以直接用True、False表示布尔值（请注意大小写），也可以通过布尔运算计算出来（例如3 < 5会产生布尔值True，而2 == 1会产生布尔值False）
- 复数型: 形如3+5j，跟数学上的复数表示一样，唯一不同的是虚部的i换成了j。实际上，这个类型并不能算作常用类型，大家了解下就可以了

### 变量命名
- 硬性规则:
  - 变量名由字母（广义的Unicode字符，不包括特殊字符）、数字和下划线构成，数字不能开头
  - 大小写敏感（大写的a和小写的A是两个不同的变量）
  - 不要跟关键字（有特殊含义的单词，后面会讲到）和系统保留字（如函数、模块等的名字）冲突
- PEP 8要求:
  - 用小写字母拼写，多个单词用下划线连接。
  - 受保护的实例属性用单个下划线开头。
  - 私有的实例属性用两个下划线开头
## 变量使用
```bash
# int:整形
num = 1
print(type(num))
# float: 浮点型
num2 = 1.23
print(type(num2))
# str 字符串
name = "力王张"
print(type(name))
# bool 布尔类型
flag = True
print(type(flag))
# list:列表
arr = [1,2,3,4]
print(type(arr))
# tuple:元组
tupleTest = (1,'hello')
print(type(tupleTest))
# set:集合
setTest = {1,2}
print(type(setTest))
# dict:字典
mapTest = {'name':'张三','age':18}
print(type(mapTest))
```
