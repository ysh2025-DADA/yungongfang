# 云工坊 GitHub Pages 部署指南

## 🚀 部署到 GitHub Pages

### 步骤1：创建GitHub仓库

1. 登录GitHub账号
2. 点击右上角"+"号，选择"New repository"
3. 仓库名称：`cloud-workshop`（或您喜欢的名称）
4. 选择"Public"（公开）
5. 勾选"Add a README file"
6. 点击"Create repository"

### 步骤2：上传网站文件

#### 方法1：使用Git命令行
```bash
# 克隆仓库
git clone https://github.com/您的用户名/cloud-workshop.git
cd cloud-workshop

# 复制网站文件到仓库
# 将web目录下的所有文件复制到仓库根目录

# 提交文件
git add .
git commit -m "Initial commit: 云工坊网站"
git push origin main
```

#### 方法2：使用GitHub网页上传
1. 在仓库页面点击"uploading an existing file"
2. 将web目录下的所有文件拖拽上传
3. 添加提交信息："Initial commit: 云工坊网站"
4. 点击"Commit changes"

### 步骤3：启用GitHub Pages

1. 进入仓库设置（Settings）
2. 左侧菜单找到"Pages"
3. Source选择"Deploy from a branch"
4. Branch选择"main"，文件夹选择"/ (root)"
5. 点击"Save"
6. 等待几分钟，GitHub会自动部署您的网站

### 步骤4：访问网站

部署完成后，您的网站地址将是：
```
https://您的用户名.github.io/cloud-workshop/
```

## 🔄 配置GitHub自动同步

### 步骤1：获取GitHub Token

1. 访问 [GitHub Token设置](https://github.com/settings/tokens)
2. 点击"Generate new token (classic)"
3. 选择权限：
   - ✅ `gist` (创建和管理Gist)
4. 点击"Generate token"
5. 复制生成的Token（以`ghp_`开头）

### 步骤2：配置自动同步

1. 访问您的网站：`https://您的用户名.github.io/cloud-workshop/`
2. 点击"导航中心"
3. 点击"GitHub自动同步"
4. 输入GitHub Token
5. 点击"初始化同步"
6. 保存生成的Gist ID

### 步骤3：在其他设备上使用

1. 在其他设备上访问网站
2. 进入"GitHub自动同步"页面
3. 输入相同的GitHub Token和Gist ID
4. 点击"初始化同步"
5. 启动自动同步

## 📋 文件结构

部署后的文件结构应该是：
```
cloud-workshop/
├── index.html                 # 登录页面
├── admin-dashboard.html       # 管理员控制台
├── admin-users.html          # 用户管理
├── admin-growth-records.html # 成长记录管理
├── admin-attendance.html     # 签到签退管理
├── admin-materials.html      # 资料管理
├── admin-warehouse.html      # 仓库管理
├── admin-statistics.html     # 数据统计
├── admin-settings.html       # 系统设置
├── student-dashboard.html    # 学生控制台
├── teacher-dashboard.html    # 教师控制台
├── github-sync.js           # GitHub同步脚本
├── github-sync-manager.html # GitHub同步管理
├── user-sync.html           # 用户数据同步
├── navigation.html          # 导航中心
├── test-login.html          # 登录测试
├── debug-login.html         # 登录调试
├── quick-fix.js            # 快速修复脚本
└── README.md               # 说明文档
```

## 🔧 功能特点

### ✅ 自动同步功能
- 使用GitHub Gist作为数据存储
- 支持多设备自动同步
- 智能数据合并和冲突解决
- 离线使用支持

### ✅ 用户管理
- 管理员添加用户后自动同步
- 支持学生和教师账号
- 用户状态管理
- 密码安全存储

### ✅ 跨设备兼容
- 任何设备访问网站即可使用
- 自动检测并同步最新数据
- 无需手动导入导出

## 🛠️ 故障排除

### 网站无法访问
1. 检查GitHub Pages是否已启用
2. 确认文件已正确上传
3. 等待几分钟让GitHub完成部署

### 同步功能不工作
1. 检查GitHub Token是否正确
2. 确认Token有gist权限
3. 检查网络连接
4. 查看浏览器控制台错误信息

### 用户数据丢失
1. 使用"快速修复登录问题"功能
2. 检查GitHub同步状态
3. 手动同步数据
4. 联系技术支持

## 📞 技术支持

如果遇到问题：
1. 查看浏览器控制台错误信息
2. 使用"登录调试"页面诊断
3. 检查GitHub同步日志
4. 参考相关文档

## 🎉 部署完成

恭喜！您的云工坊网站已成功部署到GitHub Pages，并配置了自动同步功能。现在您可以在任何设备上访问网站，所有用户数据都会自动同步。

### 默认账号
- **管理员**：18072830839 / ysh938798
- **学生**：student1 / 123456 (张三)
- **教师**：teacher1 / 123456 (王老师)

### 网站地址
```
https://您的用户名.github.io/cloud-workshop/
```

享受使用云工坊的便利吧！🚀 