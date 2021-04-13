# python学习第十天 小案例
## 案例介绍
名称: 学员管理系统
需求: 系统功能如下:
- 1 添加学员
- 2 删除学员
- 3 修改学员
- 4 查询学员信息
- 5 显示所有学员信息
- 6 退出系统
## 代码示例:
```py
# 定义全局变量用于存储所有的学员信息
users_info = []
count_id = 1


def info_print():
    print("-" * 5 + "欢迎进入学员管理系统,请选择您需要的操作:" + "-" * 5)
    print("1 添加学员")
    print("2 删除学员")
    print("3 修改学员")
    print("4 查询学员信息")
    print("5 显示所有学员信息")
    print("6 退出系统")
    print("-" * 10)


def user_add():
    """添加学员"""
    user_name = input("请输入学员name: ")
    user_phone = input("请输入学员phone: ")

    global users_info, count_id
    for i in users_info:
        if user_name == i['name']:
            print("学员已存在,返回首页!")
            return

    user_info = dict()
    user_info['id'] = count_id
    user_info['name'] = user_name
    user_info['phone'] = user_phone

    users_info.append(user_info)
    count_id += 1
    print("添加学员成功!")
    print(users_info)


def del_user():
    """删除学员"""
    user_name = input("请输入学员姓名: ")

    global users_info
    for i in users_info:
        if user_name == i['name']:
            users_info.remove(i)
            print("删除学员成功")
            break
    else:
        print("删除失败!此学员不存在")

    print(users_info)


def upd_user():
    """修改学员"""
    user_name = input("请输入要修改的学员姓名: ")
    global users_info
    for i in users_info:
        if user_name == i['name']:
            i['phone'] = input("请输入新的手机号: ")
            print("修改成功!")
            break
    else:
        print("此学员不存在!")

    print(users_info)


def query_user():
    """查询学员信息"""
    user_name = input("请输入学员姓名: ")
    global users_info
    for i in users_info:
        if user_name == i['name']:
            print(f"id:{i['id']},name:{i['name']},phone:{i['phone']}")
            break
    else:
        print("查无此学员!")

    print(users_info)


def query_all():
    """查询所有学员信息"""
    global users_info
    print("id \t name \t phone")
    for i in users_info:
        print(f"{i['id']} \t {i['name']} \t {i['phone']}")


while True:
    info_print()
    key_user = input("请选择您要进行的操作: ")
    if key_user == "1":
        # print("1 添加学员")
        user_add()
    elif key_user == "2":
        # print("2 删除学员")
        del_user()
    elif key_user == "3":
        # print("3 修改学员")
        upd_user()
    elif key_user == "4":
        # print("4 查询学员")
        query_user()
    elif key_user == "5":
        # print("5 显示所有学员信息")
        query_all()
    elif key_user == "6":
        print("6 退出系统")
        exit_flag = input("您真的要退出吗? (y/n) ")
        if exit_flag == "y":
            break
```
