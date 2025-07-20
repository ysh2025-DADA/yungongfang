@echo off
echo 正在启动云工坊本地服务器...
echo.
echo 请确保您已经安装了Python
echo.

cd /d "%~dp0"

echo 启动HTTP服务器...
start python -m http.server 8000

echo.
echo 等待服务器启动...
timeout /t 3 /nobreak >nul

echo.
echo 正在打开浏览器...
start http://localhost:8000/test-github-sync.html

echo.
echo 服务器已启动！
echo 网站地址: http://localhost:8000
echo GitHub同步测试页面: http://localhost:8000/test-github-sync.html
echo.
echo 按任意键停止服务器...
pause >nul

echo 正在停止服务器...
taskkill /f /im python.exe >nul 2>&1
echo 服务器已停止。 