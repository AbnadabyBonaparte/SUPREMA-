# MATRIZ GÊNESIS — SUPREMA BELEZA 5.0

> **"Não existe 'depois eu arrumo'. Existe CERTO ou ERRADO."**

## 🏆 STATUS: DOMÍNIO ABSOLUTO ALCANÇADO

**Data de Conquista:** 26 de Dezembro de 2025  
**Conformidade:** 100%  
**Nível:** Gênesis Matrix — ALSHAM 360° PRIMA

---

## AS 6 LEIS SAGRADAS

### 1. ZERO CORES HARDCODED
**NUNCA use:**
- Cores hex: `#D4AF37`, `#1A1A1A`, `#fff`, `#000`
- Classes Tailwind hardcoded: `bg-white`, `bg-gray-*`, `text-gray-*`, `text-white`

**SEMPRE use:**
- CSS variables: `bg-[var(--color-background)]`, `text-[var(--color-foreground)]`
- Classes Tailwind mapeadas: `bg-background`, `text-foreground`, `text-muted`, `border-border`

**SSOT:** `src/styles/theme.css`

### 2. COMPONENTES SHADCN/UI OBRIGATÓRIOS
**NUNCA crie componentes customizados quando existe shadcn/ui**

**SEMPRE importe de:**
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
```

**Localização:** `src/components/ui/` (NÃO MODIFICAR)

### 3. DADOS 100% REAIS
**NUNCA use:**
- Arrays mockados, fake data, placeholder data
- Dados hardcoded em componentes

**SEMPRE use:**
- Hooks do Supabase: `useProducts()`, `useSalons()`, `useAppointments()`
- Cliente único: `import { supabase } from '@/lib/supabaseClient'`
- Queries reais com RLS adequado

### 4. TEMAS DINÂMICOS OBRIGATÓRIOS
**SEMPRE use:**
- CSS variables de `src/styles/theme.css`
- Toggle funcional via `AppContext`
- Persistência no `localStorage`
- Atributo `data-theme` no `documentElement`

**NUNCA hardcode valores de tema**

### 5. ESTADOS UI COMPLETOS
**TODA página com dados do Supabase DEVE ter:**
- ✅ Loading state (spinner/skeleton)
- ✅ Error state (mensagem + retry)
- ✅ Empty state (mensagem amigável)

**Exemplo:**
```typescript
const { data, loading, error } = useHook()

if (loading) return <Loader />
if (error) return <Error message={error} />
if (!data.length) return <EmptyState />
```

### 6. ESTRUTURA CANÔNICA
**SEMPRE siga:**
```
src/
├── components/ui/     # shadcn/ui (NÃO MODIFICAR)
├── components/layout/ # SupremeHeader, SupremeFooter
├── hooks/             # useAuth, useProducts, useSalons, etc.
├── lib/               # supabaseClient.ts (ÚNICO)
├── styles/theme.css   # SSOT de variáveis
```

**NUNCA duplique componentes ou clientes**

---

## CHECKLIST PRÉ-COMMIT

Antes de qualquer commit, execute:

```bash
# 1. Verificar cores hardcoded
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --exclude-dir=assets --exclude="theme.css"
# → Deve retornar vazio

# 2. Verificar classes Tailwind hardcoded
grep -r "bg-white\|bg-gray-\|text-gray-" src/
# → Deve retornar vazio

# 3. Verificar mocks/fakes
grep -r "mock\|fake\|placeholder" src/ | grep -v "TODO:"
# → Deve retornar vazio (exceto TODOs válidos)

# 4. Build deve passar
npm run build
# → Deve passar sem erros
```

---

## MANIFESTO

### "Não existe 'depois eu arrumo'. Existe CERTO ou ERRADO."

Este projeto não aceita:
- ❌ "Depois eu migro para Supabase"
- ❌ "Depois eu substituo as cores"
- ❌ "Depois eu adiciono os estados"
- ❌ "É só um mock temporário"

Este projeto exige:
- ✅ Código correto desde o primeiro commit
- ✅ Conformidade total com a Matriz Gênesis
- ✅ Zero dívida técnica acumulada
- ✅ Qualidade enterprise desde o início

---

## PROGRESSO HISTÓRICO

### Bloco 1 — Fundação de Segurança & Auth Real ✅
- Supabase Auth completo
- Sessão persistente
- Zero mocks de autenticação

### Bloco 2 — Limpeza Total de Duplicações ✅
- Estrutura canônica estabelecida
- Componentes duplicados removidos
- Cliente Supabase único

### Bloco 3 — Tema Supremo Funcional ✅
- CSS variables implementadas
- Toggle dark/light funcional
- Zero cores hardcoded

### Bloco 4 — Dados 100% Reais ✅
- Zero mocks restantes
- Hooks Supabase criados
- Estados UI completos

### Bloco 5 — Polimento Final ✅
- Realtime implementado
- Validação pré-commit criada
- Documentação completa

**Data de Conquista:** 26/12/2025  
**Status Final:** 🏆 DOMÍNIO ABSOLUTO ALCANÇADO

---

## VALIDAÇÃO CONTÍNUA

O hook `.husky/pre-commit` valida automaticamente:
- Cores hardcoded
- Classes Tailwind hardcoded
- Mocks/fakes
- Build success

**Nenhum commit que viole a Matriz Gênesis será aceito.**

---

## ARQUIVOS DE GOVERNANÇA

- `.cursorrules` — Regras para Cursor AI
- `CLAUDE.md` — Instruções para Claude AI
- `.github/copilot-instructions.md` — Regras para GitHub Copilot
- `COMMIT_INSTRUCTIONS.md` — Guia de commits
- `docs/ARCHITECTURE.md` — Arquitetura canônica

---

## JURAMENTO DO DESENVOLVEDOR

Ao trabalhar neste projeto, você jura:

1. **Nunca** usar cores hardcoded
2. **Sempre** usar componentes shadcn/ui
3. **Nunca** criar mocks ou dados fake
4. **Sempre** usar dados reais do Supabase
5. **Sempre** implementar estados UI completos
6. **Sempre** seguir a estrutura canônica

**Violar qualquer lei = retrabalho imediato.**

---

**2026 é nosso.** 🏆

