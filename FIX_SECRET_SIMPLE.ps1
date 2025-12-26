# Solução SIMPLES: Reset e recriar commits sem o arquivo problemático
# Use este script se o filter-branch der problemas

Write-Host "🔧 Solução SIMPLES: Reset e recriar commits..." -ForegroundColor Yellow

# 1. Verificar commits locais não enviados
Write-Host "📋 Verificando commits locais..." -ForegroundColor Cyan
git log origin/main..HEAD --oneline

# 2. Fazer backup
Write-Host "📦 Criando backup..." -ForegroundColor Cyan
git branch backup-before-fix-$(Get-Date -Format "yyyyMMdd-HHmmss")

# 3. Reset para o último commit do remoto (antes do commit problemático)
Write-Host "🔄 Resetando para commit seguro..." -ForegroundColor Cyan
Write-Host "⚠️  Isso vai descartar commits locais. Continuar? (S/N)" -ForegroundColor Yellow
$confirm = Read-Host
if ($confirm -ne "S" -and $confirm -ne "s") {
    Write-Host "❌ Cancelado." -ForegroundColor Red
    exit 1
}

# Reset para o commit antes do problemático (c84c962)
git reset --hard c84c962

# 4. Remover arquivo temporário se existir
if (Test-Path "tmp/index-DSFzlCh_.js") {
    Write-Host "🗑️  Removendo arquivo temporário..." -ForegroundColor Cyan
    Remove-Item "tmp/index-DSFzlCh_.js" -Force
}

# 5. Adicionar apenas os arquivos corretos
Write-Host "📝 Adicionando arquivos corretos..." -ForegroundColor Cyan
git add src/
git add .gitignore
git add package.json
git add package-lock.json

# 6. Fazer commit limpo
Write-Host "💾 Criando commit limpo..." -ForegroundColor Cyan
git commit -m "fix: import theme.css correctly + resolve layout/color/z-index issues"

# 7. Push
Write-Host "🚀 Fazendo push..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "✅ CONCLUÍDO!" -ForegroundColor Green
Write-Host "📝 Se ainda der erro, use: git push origin main --force" -ForegroundColor Yellow

