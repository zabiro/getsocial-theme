# Quita BOM UTF-8 de archivos JSON (Shopify rechaza JSON con BOM)
$root = Split-Path $PSScriptRoot -Parent
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$count = 0
Get-ChildItem -Path $root -Recurse -Filter *.json | Where-Object {
  $_.FullName -notmatch '\\node_modules\\|\\.git\\'
} | ForEach-Object {
  $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) {
    $text = [System.Text.Encoding]::UTF8.GetString($bytes, 3, $bytes.Length - 3)
    [System.IO.File]::WriteAllText($_.FullName, $text, $utf8NoBom)
    Write-Host "BOM removed: $($_.Name)"
    $count++
  }
}
Write-Host "Done. $count file(s) fixed."
