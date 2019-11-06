# 函数
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
