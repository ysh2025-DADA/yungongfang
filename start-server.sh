#!/bin/bash

echo "正在启动教育平台本地服务器..."
echo ""
echo "请确保您的系统已安装Python"
echo ""

# 切换到脚本所在目录
cd "$(dirname "$0")"

# 启动Python服务器
python3 -m http.server 8000

echo ""
echo "服务器已启动！"
echo "请在浏览器中访问: http://localhost:8000"
echo ""
echo "按Ctrl+C退出..." 