# Script para remover arquivo com secret do histórico Git
# Remove tmp/index-DSFzlCh_.js do commit 8172a80

Write-Host "🔧 Removendo arquivo com secret do histórico Git..." -ForegroundColor Yellow

# 1. Verificar se estamos no branch correto
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "❌ ERRO: Você precisa estar no branch 'main'" -ForegroundColor Red
    exit 1
}

# 2. Fazer backup do branch atual
Write-Host "📦 Criando backup do branch atual..." -ForegroundColor Cyan
git branch backup-main-$(Get-Date -Format "yyyyMMdd-HHmmss")

# 3. Remover o arquivo do histórico usando filter-branch
Write-Host "🧹 Removendo tmp/index-DSFzlCh_.js do histórico..." -ForegroundColor Cyan
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch tmp/index-DSFzlCh_.js" --prune-empty --tag-name-filter cat -- --all

# 4. Limpar referências antigas
Write-Host "🧹 Limpando referências antigas..." -ForegroundColor Cyan
git for-each-ref --format="%(refname)" refs/original/ | ForEach-Object { git update-ref -d $_ }
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Verificar se o arquivo foi removido
Write-Host "✅ Verificando se o arquivo foi removido..." -ForegroundColor Green
$fileExists = git log --all --full-history -- "tmp/index-DSFzlCh_.js" | Select-Object -First 1
if ($fileExists) {
    Write-Host "⚠️  Aviso: O arquivo ainda pode estar no histórico. Use BFG Repo-Cleaner para remoção completa." -ForegroundColor Yellow
} else {
    Write-Host "✅ Arquivo removido do histórico!" -ForegroundColor Green
}

# 6. Instruções finais
Write-Host ""
Write-Host "📝 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host "1. Verifique o histórico: git log --oneline -10" -ForegroundColor White
Write-Host "2. Se estiver tudo ok, force push: git push origin main --force" -ForegroundColor White
Write-Host "3. ⚠️  ATENÇÃO: Force push reescreve o histórico remoto!" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Alternativa mais segura (se o filter-branch não funcionar):" -ForegroundColor Cyan
Write-Host "   Use BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/" -ForegroundColor White

