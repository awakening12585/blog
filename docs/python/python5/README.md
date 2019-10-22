# python学习第五天 元组
一个元组可以存储多个数据,元组内的数据是不能修改的.
## 定义
```bash
# 多个数据元组
t1 = ('Tom',1,[1,2])
# 单个元组
t2 = (1,)
```
> 注意: 如果定义的元组只有一个数据,是必须要添加逗号,否则数据类型为唯一的这个数据的数据类型
## 常见操作
元组数据不支持修改,只支持查找
- 按下标查找数据
```bash
tuple1 = (1,2,3)
print(tuple1[1]) # 2
```
- index():获取指定数据的下标,如果不存在则报错
```bash
tuple1 = ('aa','bb','cc')
print(tuple1.index('aa')) # 0
print(tuple1.index('123')) # 报错 ValueError: tuple.index(x): x not in tuple
```

- count(): 统计某个数据在当前元组出现的次数
```bash
tuple1 = ('aa','bb','cc','bb')
print(tuple1.count('aa')) # 1
print(tuple1.count('bb')) # 2
print(tuple1.count('213')) # 0
```

- len(): 统计元组中数据的个数
```bash
tuple1 = ('aa','bb','cc','bb')
print(len(tuple1)) # 4
```

- 修改元组中的列表
```bash
tuple1 = ('aa','bb','cc',[1,2,3])
tuple1[3][0] = 666
print(tuple1) # ('aa', 'bb', 'cc', [666, 2, 3])
```
