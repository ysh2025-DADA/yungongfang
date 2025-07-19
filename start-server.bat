@echo off
echo 正在启动教育平台本地服务器...
echo.
echo 请确保您的系统已安装Python
echo.
cd /d "%~dp0"
python -m http.server 8000
echo.
echo 服务器已启动！
echo 请在浏览器中访问: http://localhost:8000
echo.
echo 按任意键退出...
pause >nul 