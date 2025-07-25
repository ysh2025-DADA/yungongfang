# 云工坊用户数据同步使用指南

## 📋 问题背景

由于云工坊系统使用浏览器的localStorage存储用户数据，不同电脑之间的数据是独立的。当管理员在一台电脑上添加了新用户后，其他电脑无法直接使用这些新账号登录。

## 🔄 解决方案

我们提供了用户数据导出/导入功能，让管理员可以将用户数据分享给其他电脑使用。

## 📤 导出用户数据（管理员操作）

### 方法1：通过用户管理页面
1. 登录管理员账号（18072830839 / ysh938798）
2. 进入"用户管理"页面
3. 点击"导出用户"按钮
4. 系统会自动下载一个JSON文件
5. 将文件分享给其他电脑（U盘、网盘、邮件等）

### 方法2：通过数据同步页面
1. 访问"用户数据同步"页面
2. 点击"导出用户数据"按钮
3. 下载JSON文件并分享

## 📥 导入用户数据（其他电脑操作）

### 方法1：通过用户管理页面
1. 登录管理员账号
2. 进入"用户管理"页面
3. 点击"导入用户"按钮
4. 选择从管理员电脑导出的JSON文件
5. 确认导入

### 方法2：通过数据同步页面（推荐）
1. 访问"用户数据同步"页面
2. 点击"导入用户数据"按钮
3. 选择JSON文件
4. 确认导入

## 🎯 使用流程示例

### 场景：学校有多台电脑需要使用云工坊

#### 步骤1：管理员电脑
1. 管理员在A电脑上登录系统
2. 添加新学生：张三（用户名：zhangsan，密码：123456）
3. 添加新教师：李老师（用户名：lilaoshi，密码：123456）
4. 导出用户数据，得到文件：`云工坊用户数据_2024-01-15.json`

#### 步骤2：其他电脑
1. 在B电脑上访问"用户数据同步"页面
2. 点击"导入用户数据"
3. 选择从A电脑导出的JSON文件
4. 确认导入
5. 现在B电脑可以使用新账号登录：
   - 学生：zhangsan / 123456
   - 教师：lilaoshi / 123456

## ⚠️ 注意事项

### 数据安全
- 导出的JSON文件包含用户密码，请妥善保管
- 建议通过安全渠道传输文件
- 导入后可以删除临时文件

### 数据冲突处理
- 系统会自动处理用户名重复问题
- 如果导入的用户名已存在，会跳过该用户
- 用户ID会自动重新分配，避免冲突

### 版本兼容性
- 导出文件包含版本信息，确保兼容性
- 建议使用最新版本的系统

## 🔧 故障排除

### 导入失败
1. 检查文件格式是否为JSON
2. 确认文件未损坏
3. 尝试重新导出文件

### 用户无法登录
1. 确认导入成功
2. 检查用户状态是否为"正常"
3. 使用"快速修复登录问题"功能

### 数据丢失
1. 定期导出用户数据作为备份
2. 使用"用户数据同步"页面查看当前状态
3. 如有问题，可以重新导入备份文件

## 📞 技术支持

如果遇到问题，可以：
1. 访问"登录调试"页面进行诊断
2. 查看浏览器控制台的错误信息
3. 使用"快速修复登录问题"功能

## 🎉 总结

通过用户数据同步功能，您可以：
- ✅ 在不同电脑间共享用户数据
- ✅ 确保所有设备都能使用管理员添加的账号
- ✅ 安全地备份和恢复用户数据
- ✅ 轻松管理多台设备

现在您可以在任何电脑上使用管理员添加的账号登录云工坊了！ 