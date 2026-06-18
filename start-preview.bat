@echo off
chcp 65001 >nul
cd /d "%~dp0landing"
echo.
echo  景纯设计 · 本地预览（与 Cloudflare 部署结构一致）
echo  ==============================
echo  启动后请在浏览器打开:
echo  http://127.0.0.1:8765/
echo  ==============================
echo.
start "" "http://127.0.0.1:8765/"
py -m http.server 8765 --bind 127.0.0.1
pause
