# python学习第八天 函数
## 示例
```bash
# 求和
def sum_num2(a, b):
    return a + b

result = sum_num2(1, 2)
print(result) # 3
```

## 函数说明文档
在函数的第一行的多行注释作为函数的说明文档,可使用help函数查看
```bash
def sum_num2(a, b):
    """求和函数"""
    return a + b

help(sum_num2)#sum_num2(a, b)    求和函数

# 方式二
def sum_num2(a, b):
    """
    求和函数
    :param a: 参数1 
    :param b: 参数2
    :return: 返回值
    """
    return a + b
```

## 变量作用域
局部变量和全局变量的区别,在此不再描述,python 中如何在函数中使用全局变量
```py
count = 100  # 定义全局变量
def test_a():
    global count
    count += 10
    print(count) # 110

test_a()
print(count) # 110
```
## 函数多返回值写法
在python中,函数可以返回多个值, 结果是已元组的形式
```py
def test_a():
    return 1, 2

result = test_a()
print(result) # (1, 2)
```
## 函数参数
### 位置参数
形参和实参的个数和位置必须一直
```py
def user_info(name, age, sex):
    print(f"姓名:{name},年龄:{age},性别:{sex}")

user_info("张三", 18, '男')  # 姓名:张三,年龄:18,性别:男
user_info(18, "张三", '男')  # 姓名:18,年龄:张三,性别:男
user_info(18, "张三")  # TypeError: user_info() missing 1 required positional argument: 'sex'
```
### 关键字参数
在传递实参时,可以使用关键字,从而解决形参顺序的问题
```py
def user_info(name, age, sex):
    print(f"姓名:{name},年龄:{age},性别:{sex}")

user_info("张三", 18, '男')  # 姓名:张三,年龄:18,性别:男
user_info(age=18, name="张三",sex='男')  # 姓名:张三,年龄:18,性别:男
user_info(age=18, name="张三")  # TypeError: user_info() missing 1 required positional argument: 'sex'
```
### 缺省参数
缺省参数又叫默认参数
```py
def user_info(name, age, sex="男"):
    print(f"姓名:{name},年龄:{age},性别:{sex}")

user_info("张三", 18, '男')  # 姓名:张三,年龄:18,性别:男
user_info(age=18, name="张三", sex='女')  # 姓名:张三,年龄:18,性别:女
user_info(age=18, name="张三")  # 姓名:张三,年龄:18,性别:男
```
### 可变参数
形参的个数不确定,分为不定长位置参数和不定长关键字参数
- 不定长位置参数
```py
def test(*args):
    print(args)

test(1, 2, 3, 4) # (1, 2, 3, 4) 元组形式
```
- 不定长关键字参数
```py
def test(**kwargs):
    print(kwargs)

test(name='张三', age=18)  # {'name': '张三', 'age': 18} 字典形式
```
## 元组&字典拆包
```py
# 元组拆包
tuple1 = (1, 2)
a, b = tuple1
print(f"a={a},b={b}")  # a=1,b=2
# 字典拆包
dict1 = {'name': 'Tom', 'age': 18}
name, age = dict1
print(f"name:{name},age:{age}")  # name:name,age:age 字典拆包,获取到的是 字典的key值,value获取需要根据key获取
name_value = dict1[name]
age_value = dict1[age]
print(f"name:{name_value},age:{age_value}") # name:Tom,age:18
```
## 可变&不可变类型
- 可变类型
  - 列表
  - 字典
  - 集合
- 不可变类型
  - 整型
  - 浮点型
  - 字符串
  - 元组
  所谓的是否可变是指:数据所在的数据空间的内容是否可变,如整形,分配的内存空间不可变,只能通过从新分配内存空间,我们可以通过id()来获取内存地址
  ```py
  # 当 a 的值发生变更时,a指向的内存空间地址也发生了变更
  a = 1
  print(id(a))  # 140716764197120
  a = 2
  print(id(a))  # 140716764197152
  
  # 当列表的内容发生变更时,内存地址时没有变化的,说明列表为可变类型
  list1 = [1, 2, 3]
  print(id(list1)) # 2521124000328
  list1.append(4)
  print(id(list1)) # 2521124000328
  ```
