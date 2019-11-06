# python学习第七天 公共操作&&推导式
整理 列表 元组 集合 及字典 共有的操作 方法 推导式
## 公用运算符
运算符|描述|支持的容器类型
--|:--:|--:
+|合并|字符串 列表 元组
*|复制|字符串 列表 元组
in|元素是否存在|字符串 列表 元组 字典
not in|元素是否不存在|字符串 列表 元组 字典

- 加号运算符
```bash
# 字符串
str1 = 'aa'
str2 = 'bb'
print(str1 + str2)  # aabb
# 列表
list1 = [1, 2, 3]
list2 = [4, 5, 6]
print(list1 + list2)  # [1, 2, 3, 4, 5, 6]
# 元组
tuple1 = (1, 2)
tuple2 = (3, 4)
print(tuple1 + tuple2) # (1, 2, 3, 4)
```
- 复制运算符
```bash
# 字符串
str1 = 'aa'
print(str1 * 5) # aaaaaaaaaa
# 列表
list1 = [1, 2, 3]
print(list1 * 5)  # [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]
# 元组
tuple1 = (1, 2)
print(tuple1 * 5 ) # (1, 2, 1, 2, 1, 2, 1, 2, 1, 2)
```
- in && not in 
```bash
# 字符串
str1 = 'aa'
print('b' in str1)  # False
print('b' not in str1)  # True
# 列表
list1 = [1, 2, 3]
print(1 in list1)  # True
print(1 not in list1)  # False
# 元组
tuple1 = (1, 2)
print(1 in tuple1)  # True
print(1 not in tuple1)  # False
# 字典
dict1 = {'name': 'tom', 'age': 18}
print('name' in dict1) # True
print('name' not in dict1) # False
print('name' in dict1.keys()) # True
print('tom' in dict1.values()) # True
```
## 公用函数
函数|描述
--|:--:
len()|计算容器中元素个数
del|删除
max()|返回容器中元素最大值
min()|返回容器中元素最小值
range(start,end,step)|生成从start到end的数字,步长为step,供for循环使用
enumerate()|生成带下标的序列

- len()
```bash
str1 = 'abcd'
list1 = [1, 2, 3, 4, 5]
set1 = {1, 2, 3, 3, 3}
dict1 = {'name': 'tom', 'age': 12}
tuple1 = (1, 2)

print(len(str1)) # 4
print(len(list1)) # 5
print(len(set1)) # 3 
print(len(dict1)) # 2 
print(len(tuple1)) # 2
```

- del: 删除
- max() && min(): 返回容器中元素的最大及最小值
- range(start,end,step)
- enumerate(可遍历对象,start = 0)
> 注意: start 参数用来设置下标的起始值,默认为0
```bash
str1 = 'abcd'
list1 = [1, 2, 3, 4, 5]
set1 = {1, 2, 3, 3, 3}
dict1 = {'name': 'tom', 'age': 12}
tuple1 = (1, 2)

for i in enumerate(str1):
    print(i)
```

## 容器类型转换
- tuple() : 将某个序列转换成元组
- list() : 将某个序列转换成列表
- set() : 将某个序列转换成集合
```bash
list1 = [1, 2, 3]
set1 = {1, 2, 3}
tuple1 = (1, 2, 3)

print(type(list(tuple1))) # <class 'list'>
print(type(set(tuple1))) # <class 'set'>
print(type(tuple(set1))) # <class 'tuple'>
```
## 推导式
- 列表推导式
```bash
# 生成 0-9的 列表
# for 实现
list1 = []
for i in range(10):
    list1.append(i)
    print(i)
print(list1) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# 推导式实现
list2 = [i for i in range(10)]
print(list2) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# 带if的列表推导式
list3 = [i for i in range(10) if i % 2 == 0]
print(list3) # [0, 2, 4, 6, 8]
#多for循环实现列表推导式
list4 = [(i, j) for i in range(1,3) for j in range(3)]
print(list4) # [(1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```
- 字典推导式
```bash
# 字典推导式
dict1 = {i: i*2 for i in range(3)}
print(dict1) # {0: 0, 1: 2, 2: 4}

# 将两个列表合并成一个字典
list2 = ["name", "age"]
list3 = ["张三", 13]
dict2 = {list2[i]: list3[i] for i in range(len(list2))}
print(dict2) # {'name': '张三', 'age': 13}

# 提取字典中的目标数据
dict4 = {"yuwen": 92, "yingyu": 80, "shuxu": 100}  # 获取分数在90一样的数据
dict5 = {k: v for k, v in dict4.items() if v > 90}
print(dict5) # {'yuwen': 92, 'shuxu': 100}
```
- 集合推导式
```bash
# 集合推导式
list1 = [1, 2, 3, 3, 3]
set1 = {i for i in list1}
print(set1) # {1, 2, 3}
```
 
