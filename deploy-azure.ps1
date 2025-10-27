# Deploy Script para Azure Storage + CDN
# Executa build completo e faz upload para Azure

param(
    [string]$StorageAccount = "wisetrainingstg",
    [string]$ResourceGroup = "wisetraining-rg",
    [string]$CdnProfile = "wisetraining-cdn",
    [string]$CdnEndpoint = "wisetraining"
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  WiseTraining - Azure Deploy Script   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Azure CLI está instalado
Write-Host "🔍 Verificando Azure CLI..." -ForegroundColor Yellow
$azVersion = az version --output json 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Azure CLI não encontrado! Instale: https://aka.ms/installazurecliwindows" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Azure CLI instalado" -ForegroundColor Green
Write-Host ""

# Verificar login
Write-Host "🔍 Verificando autenticação..." -ForegroundColor Yellow
$account = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Não autenticado! Execute: az login" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Autenticado na Azure" -ForegroundColor Green
Write-Host ""

# Limpar builds anteriores
Write-Host "🧹 Limpando builds anteriores..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Diretório dist limpo" -ForegroundColor Green
}
if (Test-Path ".angular") {
    Remove-Item -Recurse -Force ".angular"
    Write-Host "✅ Cache Angular limpo" -ForegroundColor Green
}
Write-Host ""

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm ci --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependências instaladas" -ForegroundColor Green
Write-Host ""

# Build da shared-lib
Write-Host "🔨 Compilando shared-lib..." -ForegroundColor Yellow
npm run build:shared
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao compilar shared-lib" -ForegroundColor Red
    exit 1
}
Write-Host "✅ shared-lib compilada" -ForegroundColor Green
Write-Host ""

# Build dos microfrontends
Write-Host "🔨 Compilando microfrontends..." -ForegroundColor Yellow
npm run build:auth
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Erro em mfe-auth" -ForegroundColor Red; exit 1 }
Write-Host "  ✓ mfe-auth compilado" -ForegroundColor Gray

npm run build:courses
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Erro em mfe-courses" -ForegroundColor Red; exit 1 }
Write-Host "  ✓ mfe-courses compilado" -ForegroundColor Gray

npm run build:admin
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Erro em mfe-admin" -ForegroundColor Red; exit 1 }
Write-Host "  ✓ mfe-admin compilado" -ForegroundColor Gray

npm run build:company
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Erro em mfe-company" -ForegroundColor Red; exit 1 }
Write-Host "  ✓ mfe-company compilado" -ForegroundColor Gray

Write-Host "✅ Todos os microfrontends compilados" -ForegroundColor Green
Write-Host ""

# Build de produção
Write-Host "🔨 Build de produção do shell app..." -ForegroundColor Yellow
ng build --configuration production
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build de produção" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build de produção concluído" -ForegroundColor Green
Write-Host ""

# Verificar se pasta de output existe
$outputPath = "dist/WebTemplate/browser"
if (-not (Test-Path $outputPath)) {
    Write-Host "❌ Pasta de output não encontrada: $outputPath" -ForegroundColor Red
    exit 1
}

# Mostrar tamanho do bundle
Write-Host "📊 Tamanho do bundle:" -ForegroundColor Yellow
$totalSize = (Get-ChildItem -Path $outputPath -Recurse | Measure-Object -Property Length -Sum).Sum
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "  Total: $totalSizeMB MB" -ForegroundColor Gray
Write-Host ""

# Upload para Azure Storage
Write-Host "📤 Fazendo upload para Azure Storage..." -ForegroundColor Yellow
Write-Host "  Storage Account: $StorageAccount" -ForegroundColor Gray
Write-Host "  Container: `$web" -ForegroundColor Gray

az storage blob upload-batch `
  --account-name $StorageAccount `
  --source $outputPath `
  --destination '$web' `
  --overwrite `
  --no-progress `
  --output none

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no upload para Azure Storage" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Upload concluído" -ForegroundColor Green
Write-Host ""

# Purgar cache do CDN
Write-Host "🔄 Purgando cache do CDN..." -ForegroundColor Yellow
Write-Host "  CDN Profile: $CdnProfile" -ForegroundColor Gray
Write-Host "  Endpoint: $CdnEndpoint" -ForegroundColor Gray

az cdn endpoint purge `
  --resource-group $ResourceGroup `
  --profile-name $CdnProfile `
  --name $CdnEndpoint `
  --content-paths '/*' `
  --output none `
  --no-wait

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Aviso: Erro ao purgar CDN (pode não existir ainda)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Cache do CDN purgado" -ForegroundColor Green
}
Write-Host ""

# Obter URL do site
Write-Host "🌐 Obtendo URL do site..." -ForegroundColor Yellow
$storageUrl = az storage account show `
  --name $StorageAccount `
  --resource-group $ResourceGroup `
  --query "primaryEndpoints.web" `
  --output tsv

if ($storageUrl) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ Deploy concluído com sucesso!     " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 URLs:" -ForegroundColor Yellow
    Write-Host "  Storage:  $storageUrl" -ForegroundColor Cyan
    Write-Host "  CDN:      https://$CdnEndpoint.azureedge.net" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⏱️  Aguarde 5-10 minutos para o CDN propagar" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "✅ Deploy concluído!" -ForegroundColor Green
}

Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
