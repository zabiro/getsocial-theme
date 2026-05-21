# Sube GetSocial Theme a https://github.com/zabiro/getsocial-theme
# Ejecutar en PowerShell desde la raíz del proyecto: .\scripts\github-push-zabiro.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

$repo = 'zabiro/getsocial-theme'
$remoteUrl = "https://github.com/$repo.git"

# SSL en Windows (antivirus/proxy)
$env:NODE_TLS_REJECT_UNAUTHORIZED = '0'
$env:GIT_SSL_NO_VERIFY = 'true'

Write-Host "Repositorio destino: https://github.com/$repo" -ForegroundColor Cyan

$ghPaths = @(
  'gh',
  "${env:ProgramFiles}\GitHub CLI\gh.exe",
  "${env:LocalAppData}\Programs\GitHub CLI\gh.exe"
)
$gh = $null
foreach ($p in $ghPaths) {
  if (Get-Command $p -ErrorAction SilentlyContinue) { $gh = $p; break }
}

if ($gh) {
  Write-Host "Usando GitHub CLI..." -ForegroundColor Gray
  & $gh auth status 2>$null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Inicia sesión en GitHub (se abrirá el navegador):" -ForegroundColor Yellow
    & $gh auth login -h github.com -p https -w
  }
  $exists = & $gh repo view $repo 2>$null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Creando repositorio $repo ..." -ForegroundColor Gray
    & $gh repo create $repo --public --description "GetSocial Theme - Shopify OS 2.0 by Luciano De Luque (GetSocial)" --source . --remote origin --push
    exit $LASTEXITCODE
  }
  if (-not (git remote get-url origin 2>$null)) {
    git remote add origin $remoteUrl
  }
  git push -u origin main
  Write-Host "Listo: https://github.com/$repo" -ForegroundColor Green
  exit 0
}

# Sin gh: el repo debe existir vacío en GitHub (New repository → getsocial-theme)
Write-Host "GitHub CLI no instalado." -ForegroundColor Yellow
Write-Host "1) Crea el repo vacío: https://github.com/new?name=getsocial-theme" -ForegroundColor Yellow
Write-Host "2) Pulsa Enter cuando exista..." -ForegroundColor Yellow
Read-Host

if (git remote get-url origin 2>$null) {
  git remote set-url origin $remoteUrl
} else {
  git remote add origin $remoteUrl
}

git push -u origin main
Write-Host "Listo: https://github.com/$repo" -ForegroundColor Green
