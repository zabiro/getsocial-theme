# Genera ZIPs compatibles con Shopify (rutas con /, no \).
# Ejecutar desde la raíz: .\scripts\build-zips.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

& (Join-Path $PSScriptRoot 'strip-json-bom.ps1') | Out-Null

$version = '1.6.0'
$themeOnlyZip = "getsocial-theme-v$version.zip"
$clientZip = "getsocial-theme-client-v$version.zip"

$themeDirs = @('assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates')

function New-StagingDir {
    $dir = Join-Path $env:TEMP "getsocial-build-$(Get-Random)"
    if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    return $dir
}

function Copy-ThemeFiles($staging) {
    foreach ($d in $themeDirs) {
        Copy-Item -Path (Join-Path $root $d) -Destination $staging -Recurse -Force
    }
}

# Shopify requiere entradas con "/" (Compress-Archive en Windows usa "\" y falla la validación).
function Write-ShopifyZip($stagingDir, $outPath) {
    if (Test-Path $outPath) { Remove-Item $outPath -Force }
    $stagingDir = (Resolve-Path $stagingDir).Path.TrimEnd('\')
    $zip = [System.IO.Compression.ZipFile]::Open($outPath, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        Get-ChildItem -Path $stagingDir -Recurse -File | ForEach-Object {
            $relative = $_.FullName.Substring($stagingDir.Length + 1).Replace('\', '/')
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relative)
        }
    }
    finally {
        $zip.Dispose()
    }
}

# --- ZIP 1: solo tema (subir a Shopify) ---
$staging1 = New-StagingDir
Copy-ThemeFiles $staging1
Write-ShopifyZip $staging1 (Join-Path $root $themeOnlyZip)
Remove-Item $staging1 -Recurse -Force

# --- ZIP 2: paquete cliente (tema + licencia + docs; también válido en Shopify) ---
$staging2 = New-StagingDir
Copy-ThemeFiles $staging2
Copy-Item (Join-Path $root 'LICENSE.md') $staging2
Copy-Item (Join-Path $root 'SECTIONS.md') $staging2
$docsOut = Join-Path $staging2 'docs'
New-Item -ItemType Directory -Path $docsOut -Force | Out-Null
@(
    'LEEME-CLIENTE.md',
    'GUIA-COMPRADOR.md',
    'DEMOS.md',
    'LANDING-PAGES.md'
) | ForEach-Object {
    Copy-Item (Join-Path $root "docs\$_") (Join-Path $docsOut $_) -Force
}
Copy-Item (Join-Path $root 'docs\LEEME-CLIENTE.md') (Join-Path $staging2 'LEEME.md') -Force
Write-ShopifyZip $staging2 (Join-Path $root $clientZip)
Remove-Item $staging2 -Recurse -Force

Write-Host "OK: $themeOnlyZip  (solo tema - subir a Shopify)"
Write-Host "OK: $clientZip (entrega comprador; tambien valido en Shopify)"
