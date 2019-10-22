# python学习第三天 字符串
## 创建字符串几种方式
- 单引号
```bash
str1 = 'abcd'
str1 = 'I\'am Tom'
```
> 当字符串存在特殊字符 如单引号' 可以使用 \ 来进行转义
- 双引号
```bash
str2 = "hello world"
```
- 三引号
```bash
str3 = """hello
word"""
```
## 下标
字符串可以使用下标来获取单个字符
```bash
str1 = 'hello world'
print(str1[0]) # h
```
## 切片
切片是指对操作对象截取其中一部分的操作.字符串/列表/元组都支持切片操作
### 语法
```bash
序列[开始位置下标:结束位置下标:步长]
```
> 注意: 
1. 左闭右开,正负数均可
2. 步长是选取间隔,正负数均可,默认为1
### 示例
```bash
str1 = 'hello world'
print(str1[0:5:1]) #hello
print(str1[0:5]) #hello
print(str1[:7]) #hello w
print(str1[-1:-5:-1]) #dlro
print(str1[-5:-1:1]) #worl
```
## 字符串常用方法
### 查找
#### find()
检测某个字串是否包含在这个字符串中,存在则返回子串开始位置下标,否则返回-1
##### 语法:
```bash
字符串序列.find(子串,开始位置下标,结束位置下标) 
```
> 注意: 开始和结束位置下标可以省略,表示在整个字符串序列中查找
##### demo
```bash
str1 = 'hello world'
print(str1.find('wor')) #6
print(str1.find('aaa')) #-1
```

#### index()
检测某个字串是否包含在这个字符串中,存在则返回子串开始位置下标,否则报异常
##### 语法:
```bash
字符串序列.index(子串,开始位置下标,结束位置下标) 
```
> 注意: 开始和结束位置下标可以省略,表示在整个字符串序列中查找
##### demo
```bash
str1 = 'hello world'
print(str1.index('wor')) #6
print(str1.index('aaa')) #异常 ValueError: substring not found
```
#### rfind()
和find()功能相同,但查找方向为右侧开始
#### rindex()
和 index()功能相同,但查找方向为右侧开始
#### count()
返回某个子串在字符串中出现的次数
### 修改
#### replace()
替换
##### 语法:
```bash
字符串序列.replace(旧子串,新子串,替换次数)
```
##### 示例:
```bash
str1 = 'hello world'
print(str1.replace('hello','hi',1)) # hi world
```

#### split()
按照指定字符分割字符串
##### 语法:
```bash
字符串序列.split(分割字符,num)
```
> 注意: num 表示分割字符出现的次数,即将来返回数据个数为 num + 1
##### 示例:
```bash
str1 = '语文,数学,英语,物理'
print(str1.split(",",2)) # ['语文', '数学', '英语,物理']
print(str1.split(",")) # ['语文', '数学', '英语', '物理']
```

#### join()
合并列表里面的字符串数据为一个大字符串
##### 语法:
```bash
字符或子串.join(字符串序列)
```
##### 示例:
```bash
arr = ['语文', '数学', '英语', '物理']
str1 = "_"
print(str1.join(arr)) # 语文_数学_英语_物理
```

#### capitalize()
将字符串第一个字符转换成大写,其他字符全部都小写
##### 示例:
```bash
str1 = 'hello Word'
print(str1.capitalize()) # Hello word
```
#### title()
将字符串每个单词首字母转换成大写
##### 示例:
```bash
str1 = 'hello word'
print(str1.title()) # Hello Word
```
#### lower()
将字符串转换成小写
##### 示例:
```bash
str1 = 'HELLO WORD'
print(str1.lower()) # hello word
```

#### upper()
将字符串转换成大写
##### 示例:
```bash
str1 = 'hello word'
print(str1.upper()) # HELLO WORD
```

#### lstrip()
删除字符串左侧的空白字符
##### 示例:
```bash
str1 = '     hello word'
print(str1.lstrip()) # hello word
```
#### rstrip()
删除字符串右侧的空白字符
#### strip()
删除字符串两侧的空白字符

#### ljust()
返回一个 原字符串,并使用指定字符(默认空格)填充至对应长度的 新字符串
##### 语法:
```bash
字符串序列.ljust(长度,填充字符)
```
##### 示例:
```bash
str1 = 'hello'
print(str1.ljust(10,'.')) # hello.....
print(str1.ljust(1,'.')) # hello
```

#### rjust():
右对齐
##### 示例
```bash
str1 = '156'
print(str1.rjust(10,'0')) # 0000000156
print(str1.rjust(2,'0')) # 156
```

#### center():
居中,参考 rjust() ljust()

### 判断
#### startswith()
判断字符串是否以指定子串开头,如果设置开始和结束位置下标,则在指定范围内检查
##### 语法:
```bash
字符串序列.startswith(子串,开始位置下标,结束位置下标)
```
##### 示例:
```bash
str1 = 'hello word'
print(str1.startswith('hel')) # True
print(str1.startswith('w',6,10)) # True
```

#### endswith()
判断字符串是否以指定子串结尾,如果设置开始和结束位置下标,则在指定范围内检查

#### isalpha()
如果字符串至少有一个字符并且所有字符都是字母 ,则返回True

#### isdigit()
字符串只包含数字 ,则返回True

#### isalnum()
字母+数字组合

#### isspace()
只包含空白

#### in
判断一个字符串是否包含另外一个字符串
```bash
s1 = 'hello ' * 3
print(s1) # hello hello hello 
s2 = 'world'
s1 += s2
print(s1) # hello hello hello world
print('he' in s1) # True
print('good' in s1) # False
```
