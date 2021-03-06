# python学习第二天 运算符&流程控制
## 格式化输出
### 格式化符号
格式符号|转换
--|:--:
%s|字符串
%d|有符号的十进制整数
%f|浮点数
%c|字符
%u|无符号十进制整数
%o|八进制整数
%x|十六进制整数(小写ox)
%X|十六进制整数(大写OX)
%e|科学计数法(小写e)
%E|科学计数法(大写E)
%g|%f和%e的简写
%G|%f和%E的简写
### 格式化输出使用
```bash
name = '李浩'
age = 18
weight = 50.5
stu_id = 1

#1. 我叫xxx
print("我叫%s" % name)
#2. 我今年x岁
print("我今年%d岁" % age)
#3. 我的体重是x %f:输出格式是 50.500000, %.2f 表示保留两位小数
print("我的体重是%f" % weight)
print("我的体重是%.2f" % weight)
#5. 我的学号是x
print("我的学号是%d" % stu_id)
print("我的学号是%03d" % stu_id) # 不足3位,前面用0填充,超出原样输出
#4. 我叫xxx,今年x岁,体重是x,学号是x
print("我叫%s,今年%d岁,体重是%.2f,学号是%03d" % (name,age,weight,stu_id))
```
### 输出f-格式,在python3.6 提供
```bash
#1. 我叫xxx,今年x岁,体重是x,学号是x
print(f"我叫{name},今年{age}岁,体重是{weight},学号是{stu_id}")
```
## 输入 input
### 语法: input("提示语")
- 当程序执行到input 时候,进程会等待用户输入
- 接受的到的数据都会已字符串类型处理
### 示例:
```bash
username = input("请输入账号")
password = input("请输入密码")
print(f"账号:{username},密码:{password}")
```
## 常用类型转换
函数|说明
--|:--:
int(x[,base])|将x转换成整数
float(x)|将x转换为一个浮点数
str(x)|转换为字符串
eval(str)|转换字符串为本身类型,如"1"->int,"1.2" -> float
tuple(s)|将序列转换成元组
list(s)|将序列转换成列表
### 示例
```bash
str1 = "1"
# 转换成int
print(type(int(str1)))
# 转换成float
print(type(float(str1)))
age = 120
# 转成字符串
print(type(str(age)))
list1 = [10,12,22]
# 转换成元组
print(type(tuple(list1)))
# 转换成列表
tuple1 = (12,22,23)
print(type(list(tuple1)))
```
## 运算符
### 算数运算符
运算符|描述|实例
--|:--:|--:
+|加|1+1 输入结果2
-|减| 无
*|乘| 无
/|除| 10/2
//|整除|
%|取余|
**|指数|2\**4 结果为16
()|小括号|
> 混合运算优先级顺序 () 高于 ** 高于 * 高于 / // % 高于 + -
### 赋值运算符
运算符|描述|实例
--|:--:|--:
=|赋值|将=右边的结果赋值给等号左边的变量
- 单个变量赋值
```bash
num = 1
```
- 多个变量赋值
```bash
num1,float1,str1 = 10,0.5,'hello'
```
- 多变量赋相同值
```bash
a=b=10
```
## 复合赋值运算符
运算符|描述|实例
--|:--:|--:
+=|加法赋值运算符|
-=|减法赋值运算符|
*=|乘法赋值运算符|
/=|除法赋值运算符|
//=|整法赋值运算符|
%=|取余赋值运算符|
**=|幂赋值运算符|
> 注意,复合赋值运算顺序是先计算等号右边的数据,在计算复合运算,如 c = 10 , c*=1+2  结果为30
## 比较运算符
运算符|描述|实例
--|:--:|--:
==|判断是否相等| a=b=3, a==b 结果为True
!=|不等于|
\>|大于|
<|小于|
\>=|大于等于|
\<=|小于等于|
## 逻辑运算符
运算符|逻辑表达式|实例
--|:--:|--:
and|x and y| True and False 返回False
or|x or y| True or False 返回True
not|not x| not False 返回True
## if 控制语句
### 语法
```bash
if 条件:
    执行代码
elif 条件:
    执行代码
else:
    执行代码
```
### 示例demo
百分制成绩转换为等级制成绩。
> 要求：如果输入的成绩在90分以上（含90分）输出A；80分-90分（不含90分）输出B；70分-80分（不含80分）输出C；60分-70分（不含70分）输出D；60分以下输出E。
```bash
score = float(input('请输入成绩: '))
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'E'
print('对应的等级是:', grade)
```
## 循环结构
### while 循环
#### 语法
```bash
while 条件:
    重复执行代码
else:
    循环正常结束之后要执行的代码
```
> 所谓的else指的是循环正常结束之后要执行的代码,即如果是break终止循环的情况,else下方缩进的代码将不在执行
#### 示例demo
猜数字游戏:
- 计算机出一个1~100之间的随机数由人来猜
- 计算机根据人猜的数字分别给出提示大一点/小一点/猜对了
```bash
import random

answer = random.randint(1, 100)
counter = 0
while True:
    counter += 1
    number = int(input('请输入: '))
    if number < answer:
        print('大一点')
    elif number > answer:
        print('小一点')
    else:
        print('恭喜你猜对了!')
        break
print('你总共猜了%d次' % counter)
if counter > 7:
    print('你的智商余额明显不足')
```
### for-in循环
#### 语法
```bash
for 变量 in 序列:
    执行代码
else:
    循环正常结束之后要执行的代码
```
> 所谓的else指的是循环正常结束之后要执行的代码,即如果是break终止循环的情况,else下方缩进的代码将不在执行
#### 示例demo
用for循环实现1~100求和
```bash
sum = 0
for x in range(101):
    sum += x
print(sum)
```
需要说明的是上面代码中的range(101)可以用来构造一个从0到100的取值范围，这样就可以构造出一个整数的序列并用于循环中，例如：
- range(101)可以产生一个0到100的整数序列。
- range(1, 100)可以产生一个1到99的整数序列。
- range(1, 100, 2)可以产生一个1到99的奇数序列，其中2是步长，即数值序列的增量。

### 循环关键字
- break : 终止它所在的循环
- continue: 放弃本次循环后续的代码直接让循环进入下一轮
#### 示例demo
输入一个正整数判断它是不是素数:
```bash
from math import sqrt

num = int(input('请输入一个正整数: '))
end = int(sqrt(num))
is_prime = True
for x in range(2, end + 1):
    if num % x == 0:
        is_prime = False
        break
if is_prime and num != 1:
    print('%d是素数' % num)
else:
    print('%d不是素数' % num)
```
