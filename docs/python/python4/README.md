# python学习第四天 列表
## 格式
```bash
[数据1,数据2,数据3,数据4]
```
> 列表可以一次性存储多个数据,且可以为不同数据类型(工作中我们常常存储相同类型数据,方便操作)

## 常用操作
### 查找
1.1 下标
```bash
name_list = ["张三","王五","李四"]
print(name_list[0]) # 张三
print(name_list[1]) # 王五
print(name_list[2]) # 李四
```
1.2 函数
- index(): 返回指定数据所在位置的下标
```bash
//语法:
列表序列.index(数据,开始位置下标,结束位置下标)
//示例:
name_list = ["张三","王五","李四","李四"]
print(name_list.index('王五')) # 1
```
> 注意: 如果查找数据不存在则报错
- count(): 统计指定数据在当前列表中出现的次数
```bash
//语法:
列表序列.count(数据)
//示例:
name_list = ["张三","王五","李四","李四"]
print(name_list.count('李四1')) #0
print(name_list.count('李四')) #2
```
- len(): 列表长度
```bash
//语法:
len(列表序列)
//示例:
name_list = ["张三","王五","李四","李四"]
print(len(name_list)) #4
```

### 判断
- in: 判断指定数据是否存在某个列表序列
```bash
//语法:
数据 in 列表序列
// 示例:
name_list = ["张三","王五","李四","李四"]
print('里斯' in name_list) # False
print('李四' in name_list) # True
```
- not in: 判断指定数据不存在某个列表序列
```bash
name_list = ["张三","王五","李四","李四"]
print('里斯' not in name_list) # True
print('李四' not in name_list) # False
```

### 增加
- append(): 列表结尾追加数据
```bash
name_list = ["张三","王五","李四"]
name_list.append("王一")
print(name_list) # ['张三', '王五', '李四', '王一']
append_list = ['张思','王柳']
name_list.append(append_list)
print(name_list) # ['张三', '王五', '李四', '王一', ['张思', '王柳']]
```
> 注意: 1 列表是可变序列 2 当append 追加数据时一个序列时,则追加整个序列到列表

- extend(): 列表结尾追加数据,如果数据是一个序列,则将这个序列的数据逐一添加到列表
```bash
//语法:
列表序列.extend(数据)
//示例:
name_list = ["张三","王五","李四"]
name_list.extend("王东")
print(name_list) # ['张三', '王五', '李四', '王', '东']
extend_list = ["王东","马腾"]
name_list.extend(extend_list)
print(name_list) # ['张三', '王五', '李四', '王', '东', '王东', '马腾']
```

- insert(): 指定位置新增数据
```bash
//语法:
列表序列.insert(位置下标,数据)
//示例:
name_list = ["张三","王五","李四"]
name_list.insert(1,"曾鑫")
print(name_list) # ['张三', '曾鑫', '王五', '李四']
insert_list = ['小明','小红']
name_list.insert(1,insert_list) # ['张三', ['小明', '小红'], '曾鑫', '王五', '李四']
print(name_list)
```

### 删除
- del 删除列表或删除列表指定元素
```bash
// 语法:
del 目标
// 示例:
name_list = ["张三","王五","李四"]
del name_list[0]
print(name_list) # ['王五', '李四']
del name_list 
print(name_list) # 整个列表被删除
```

- pop(): 删除指定下标的数据(默认为最后一个),并返回该数据
```bash
//语法:
列表序列.pop(下标)
//示例:
name_list = ["张三","王五","李四"]
print(name_list.pop())# 李四
print(name_list) # ['张三', '王五']
print(name_list.pop(0)) # 张三
print(name_list) # ['王五']
```

- remove(): 移除列表中某个数据的第一个匹配项
```bash
//语法:
列表序列.remove(数据)
//示例:
name_list = ["张三","王五","李四"]
name_list.remove("张三")
print(name_list)# ['王五', '李四']
name_list.remove("张三111") # 报错
```
> 注意: 当删除列表中不存在的元素时会报错

- clear(): 清空列表
```bash
//语法:
列表序列.clear()
//示例:
name_list = ["张三","王五","李四"]
name_list.clear()
print(name_list)# []
```

### 修改
- 修改指定下标的数据
```bash
//示例:
name_list = ["张三","王五","李四"]
name_list[0] = '小明'
print(name_list) # ['小明', '王五', '李四']
```

- reverse(): 逆置
```bash
name_list = [1,2,3,4,5]
name_list.reverse()
print(name_list) # [5, 4, 3, 2, 1]
```

- sort(): 排序
```bash
name_list = [2,1,4,3,5]
name_list.sort(key=None,reverse=False)
print(name_list) # [1, 2, 3, 4, 5]
name_list.sort(key=None,reverse=True)
print(name_list) # [5, 4, 3, 2, 1]
```

### 复制
- copy()
```bash
name_list = [2,1,4,3,5]
temp_list = name_list.copy()
print(temp_list) # [2, 1, 4, 3, 5]
```

## 循环遍历
- while
```bash
//代码示例:
name_list = [2,1,4,3,5]

index = 0
while index < len(name_list):
    print(name_list[index])
    index +=1
```
- for 
```bash
name_list = [2,1,4,3,5]

for x in name_list:
    print(x)
```

## 列表嵌套
```bash
class_list = [['张毅','张二','张三'], ['李一','利尔','李三'], ['王一','王二','王三']]
# 获取张二
print(class_list[0][1])
```
