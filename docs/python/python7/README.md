# python学习第七天 集合set
## 定义
```bash
# 有数据的集合
set1 = {10,20,20,30}
print(type(set1)) # <class 'set'>
print(set1) # {10, 20, 30}  去重
# 空集合
set2 = set()
print(type(set2)) # <class 'set'>
print(set2) # set()
```
> 注意: 创建空集合时,只能使用 set(),因为{ } 用来创建空字典

## 常见操作
### 增加
- add(): 添加一个数据
```bash

```
- update(): 追加一个序列
```bash
set1 = {10,20}
# set1.update(10) # TypeError: 'int' object is not iterable
# set1.update((1,2)) # {1, 10, 2, 20}
# set1.update([10,20,30]) # {10, 20, 30}
# set1.update({10,20,30}) #{20, 10, 30}
set1.update("abc") # {'c', 10, 'a', 20, 'b'} # 追加字符串也会按照字符序列拆分添加
print(set1)
```
### 删除
- remove(): 删除集合中指定的数据,如果数据不存在则报错
```bash
set1 = {10,20}
set1.remove(10)
# set1.remove(100) # KeyError: 100
print(set1) # {20}
```

- discard(): 删除集合中的指定数据,如果数据不存在也不会报错
```bash
set1 = {10,20}
set1.discard(100) # {10,20}
set1.discard(10)
print(set1) # {20}
```

- pop: 随机删除,并返回删除的数据
```bash
set1 = {20,10,30}
print(set1) # {10, 20, 30}
num = set1.pop()
print(num) # 10
print(set1) # {20, 30}
```

### 查找
- in : 是否存在
```bash
set1 = {20,10,30}
print(10 in set1) # True
print(10 not in set1) # False
```
- not in : 是否不存在
```bash
set1 = {20,10,30}
print(10 in set1) # True
print(10 not in set1) # False
```
