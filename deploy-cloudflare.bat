@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  ???? · Cloudflare Pages ??
echo  ==============================
echo.

where npx >nul 2>&1
if errorlevel 1 (
  echo [??] ??? npx????? Node.js: https://nodejs.org/
  pause
  exit /b 1
)

if not "%SITE_URL%"=="" (
  echo  ???? URL: %SITE_URL%
  node scripts/inject-site-url.mjs
  echo.
)

echo  ????? Cloudflare Pages...
echo  ???: pure-vista-landing
echo  ????: landing/
echo.
echo  ??????? Cloudflare ???wrangler login?
echo  ==============================
echo.

npx wrangler pages deploy landing --project-name=pure-vista-landing --commit-dirty=true

echo.
pause
