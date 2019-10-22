# python学习第六天 字典dict
## 定义
```bash
dict1 = {'name': 'Tom', 'age': 12, 'gender': '男'}
print(dict1) # {'name': 'Tom', 'age': 12, 'gender': '男'}
print(type(dict1)) # <class 'dict'>

# 空字典
dict2 = {}
dict3 = dict()
print(type(dict2)) # <class 'dict'>
print(type(dict3)) # <class 'dict'>
```
## 常见操作
### 新增
写法: 字典序列[key] = 值
```bash
dict1 = {'name': 'Tom'}
dict1['id'] = 101
print(dict1) # {'name': 'Tom', 'id': 101}

dict1['name'] = 'Rose'
print(dict1) # {'name': 'Rose', 'id': 101}
```
> 字典是可变类型,新增时,如果key存在则更新值,不存在则新增

### 删除
- del(): 删除字典或者删除字典中指定的键值对
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
del(dict1['name']) # 删除字典中指定键值对
print(dict1) # {'id': 101, 'age': 18}
del dict1['id'] # 删除字典中指定键值对
print(dict1) # {'age': 18}
# del(dict1['gender']) # 当删除不存在的key时候, KeyError: 'gender'
del dict1 # 删除整个字典
```

- clear(): 清空字典
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
dict1.clear() # 清空字典
print(dict1) # {} 
```

### 修改
写法: 字典序列[key] = 值
> 如果key不存在则新增

### 查询
- key值查找
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
print(dict1['id']) #101
print(dict1['123']) # KeyError: '123'
```
> key存在返回value,不存在报错

- get()
```bash
# 语法: 
字典序列.get(key,默认值)
# 示例
dict1 = {'id':101,'name': 'Tom','age':18}
print(dict1.get('id')) # 101
print(dict1.get('aaa','vvv')) # vvv
print(dict1.get('name','vvv')) # Tom
```
> 如果key 存在返回value, 不存在则返回默认值

- keys(): 返回字典序列所有key的可迭代对象
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
print(dict1.keys()) # dict_keys(['id', 'name', 'age'])
```

- values(): 返回字典序列所有value的可迭代对象
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
print(dict1.values()) # dict_values([101, 'Tom', 18])
```

- items(): 返回字典序列键值对的可迭代对象(元组形式)
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
print(dict1.items()) # dict_items([('id', 101), ('name', 'Tom'), ('age', 18)])
```

### 遍历
- 遍历所有的key
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
for key in dict1.keys():
    print(key)
```
- 遍历value
```bash
dict1 = {'id':101,'name': 'Tom','age':18}
for v in dict1.values():
    print(v)
```
- 遍历字典元素
```bash
dict1 = {'id': 101, 'name': 'Tom', 'age': 18}
# 遍历元素
for item in dict1.items():
    print(item)
# 拆包
for k, v in dict1.items():
    print(f"{k}  :  {v}")
```
