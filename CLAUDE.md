# CLAUDE.md - SUPREMA BELEZA

LEIA ESTE ARQUIVO INTEIRO ANTES DE QUALQUER ALTERAÇÃO

## SOBRE O PROJETO
SUPREMA BELEZA 5.0 — plataforma premium de beleza com 18 agentes IA, AR try-on, e-commerce de luxo.

Stack: React 19 + TypeScript + Vite + Tailwind + shadcn/ui + Supabase + Gemini 2.5

## REGRAS ABSOLUTAS
1. Zero cores hardcoded — usar apenas CSS variables de src/styles/theme.css
2. Zero mock data — tudo do Supabase real
3. Usar apenas componentes shadcn/ui
4. Tema dinâmico obrigatório
5. Estados loading/error/empty em toda página com dados
6. Cliente Supabase único: '@/lib/supabaseClient'

## ESTRUTURA CANÔNICA
src/
├── components/ui/     # shadcn/ui (NÃO MODIFICAR)
├── components/layout/ # SupremeHeader, SupremeFooter
├── hooks/             # useAuth, useProducts, useSalons, etc.
├── lib/               # supabaseClient.ts (ÚNICO)
├── styles/theme.css   # SSOT de variáveis

## VALIDAÇÃO ANTES DE COMMIT
grep -r "#[0-9a-fA-F]\{3,6\}" src/ → deve retornar vazio
grep -r "bg-white\|bg-gray-\|text-gray-" src/ → vazio
grep -r "mock\|fake\|placeholder" src/ → vazio
npm run build → deve passar

Qualquer violação = retrabalho.

