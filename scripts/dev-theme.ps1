# Desarrollo en vivo con Shopify CLI (tienda: prueba-tienda-3bmgzfei)
# Uso: .\scripts\dev-theme.ps1
# Si tu red/antivirus rompe certificados SSL, este script desactiva la verificación TLS solo en esta sesión.

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

# Solución temporal cuando aparece: "unable to verify the first certificate"
# Alternativa segura: exportar el certificado de tu antivirus/proxy y usar NODE_EXTRA_CA_CERTS
$env:NODE_TLS_REJECT_UNAUTHORIZED = '0'

Write-Host "Iniciando theme dev (GetSocial Theme)..." -ForegroundColor Cyan
Write-Host "Tienda: prueba-tienda-3bmgzfei.myshopify.com" -ForegroundColor Gray
Write-Host ""

shopify theme dev @args
