# ARCHITECTURE.md — SUPREMA BELEZA 5.0

## Visão Geral da Arquitetura

SUPREMA BELEZA 5.0 é uma plataforma premium de beleza construída com React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase e Google Gemini 2.5 Pro.

---

## Estrutura de Pastas Canônica

```
SUPREMA-/
├── src/
│   ├── app/
│   │   ├── routes/          # Páginas da aplicação
│   │   │   ├── HomePage.tsx
│   │   │   ├── ShopPage.tsx
│   │   │   ├── SaloesPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── ...
│   │   ├── router.tsx        # Configuração de rotas
│   │   └── RootLayout.tsx    # Layout raiz
│   │
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (NÃO MODIFICAR)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/           # Componentes de layout
│   │   │   ├── SupremeHeader.tsx
│   │   │   └── SupremeFooter.tsx
│   │   ├── ai/               # Componentes de IA
│   │   │   ├── GlobalAssistant.tsx
│   │   │   ├── SmartConsultation.tsx
│   │   │   ├── ImageStudio.tsx
│   │   │   └── Chat.tsx
│   │   ├── cart/             # Componentes de carrinho
│   │   │   └── CartDrawer.tsx
│   │   ├── cards/            # Cards customizados
│   │   │   ├── ProductCard.tsx
│   │   │   └── AgentCardDynasty.tsx
│   │   └── sections/         # Seções da homepage
│   │       ├── SupremeHero.tsx
│   │       └── TrendSpotlight.tsx
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Autenticação
│   │   ├── useProducts.ts    # Produtos do Supabase
│   │   ├── useSalons.ts      # Salões do Supabase
│   │   ├── useAppointments.ts # Agendamentos (com realtime)
│   │   ├── useProduct.ts     # Produto individual (com realtime)
│   │   ├── useSubscriptionBoxes.ts # Boxes de assinatura
│   │   └── useCart.ts        # Gerenciamento de carrinho
│   │
│   ├── lib/                  # Bibliotecas e utilitários
│   │   ├── supabaseClient.ts # ⚠️ SSOT - ÚNICO cliente Supabase
│   │   ├── env.ts            # Variáveis de ambiente
│   │   ├── utils.ts          # Funções utilitárias
│   │   ├── motion-variants.ts # Variantes Framer Motion
│   │   └── zod.ts            # Schema validation
│   │
│   ├── contexts/             # React Contexts
│   │   ├── AppContext.tsx    # Contexto global (user, cart, theme)
│   │   └── ToastContext.tsx  # Notificações toast
│   │
│   ├── services/             # Serviços externos
│   │   ├── ai/               # Serviços de IA
│   │   │   ├── agents.ts     # Configuração dos 18 agentes
│   │   │   └── geminiService.ts # Integração Gemini
│   │   └── stripe.ts         # Integração Stripe
│   │
│   ├── styles/               # Estilos globais
│   │   ├── theme.css         # ⚠️ SSOT - Variáveis CSS de tema
│   │   └── index.css         # Estilos globais
│   │
│   └── types/                # TypeScript types
│       └── ai.ts             # Types relacionados a IA
│
├── .github/                  # GitHub configurations
│   └── copilot-instructions.md
│
├── docs/                     # Documentação
│   ├── MATRIZ_GENESIS.md
│   └── ARCHITECTURE.md
│
├── .husky/                   # Git hooks
│   └── pre-commit            # Validação pré-commit
│
├── supabase_schema.sql       # Schema do banco de dados
├── .cursorrules              # Regras para Cursor AI
├── CLAUDE.md                 # Instruções para Claude AI
└── README.md                 # Documentação principal
```

---

## Single Source of Truth (SSOT)

### 1. Cliente Supabase
**Arquivo:** `src/lib/supabaseClient.ts`

```typescript
import { supabase } from '@/lib/supabaseClient'
```

**⚠️ REGRA:** Este é o ÚNICO lugar onde o cliente Supabase deve ser criado. Todos os outros arquivos devem importar deste arquivo.

### 2. Variáveis de Tema
**Arquivo:** `src/styles/theme.css`

```css
:root {
  --color-primary: var(--color-gold-legacy);
  --color-background: var(--color-obsidian-950);
  --color-surface: var(--color-obsidian-900);
  /* ... */
}
```

**⚠️ REGRA:** Todas as cores devem vir deste arquivo. Zero cores hardcoded no código.

### 3. Componentes UI
**Localização:** `src/components/ui/`

**⚠️ REGRA:** Componentes shadcn/ui não devem ser modificados diretamente. Use variantes ou estenda via className.

---

## Fluxo de Autenticação

```
1. Usuário acessa LoginPage
   ↓
2. LoginPage usa useAuth() hook
   ↓
3. useAuth() chama supabase.auth.signInWithPassword()
   ↓
4. Supabase retorna session
   ↓
5. useAuth() atualiza estado
   ↓
6. AppContext sincroniza com useAuth()
   ↓
7. ProtectedRoute verifica session
   ↓
8. Se autenticado → renderiza página
   Se não → redirect para /login
```

**Persistência:**
- Sessão persiste automaticamente via Supabase (localStorage)
- `onAuthStateChange` detecta mudanças de sessão
- Refresh da página mantém sessão

---

## Fluxo de Tema

```
1. Usuário clica em toggle de tema
   ↓
2. AppContext.toggleTheme() é chamado
   ↓
3. theme state é atualizado
   ↓
4. useEffect detecta mudança
   ↓
5. document.documentElement.setAttribute('data-theme', theme)
   ↓
6. CSS variables em theme.css mudam automaticamente
   ↓
7. Tema persiste no localStorage
```

**SSOT:** `src/styles/theme.css` + `AppContext`

---

## Fluxo de Dados (Supabase)

### Produtos
```
ShopPage
  ↓
useProducts(category?)
  ↓
supabase.from('products').select('*')
  ↓
Transformação para formato do componente
  ↓
Renderização com loading/error/empty states
```

### Salões
```
SaloesPage
  ↓
useSalons()
  ↓
supabase.from('salons').select('*')
  ↓
Para cada salon: busca professionals
  ↓
Para cada professional: busca services
  ↓
Retorna salons com profissionais e serviços aninhados
```

### Agendamentos (com Realtime)
```
DashboardPage
  ↓
useAppointments()
  ↓
supabase.from('appointments').select('*').eq('user_id', user.id)
  ↓
supabase.channel().on('postgres_changes') // Realtime
  ↓
Atualiza automaticamente quando há mudanças
```

---

## Rotas Protegidas

**Arquivo:** `src/components/ProtectedRoute.tsx`

```typescript
<ProtectedRoute requiredTier="premium">
  <PremiumPage />
</ProtectedRoute>
```

**Lógica:**
1. Verifica se usuário está autenticado
2. Verifica se usuário tem tier suficiente
3. Se não → mostra tela de upgrade
4. Se sim → renderiza children

---

## Hooks Customizados

### useAuth
- Gerencia autenticação completa
- Retorna: `user`, `session`, `loading`, `login()`, `logout()`, `signUp()`
- Monitora mudanças de sessão via `onAuthStateChange`

### useProducts
- Busca produtos do Supabase
- Suporta filtro por categoria
- Retorna: `products`, `loading`, `error`

### useSalons
- Busca salões com profissionais e serviços
- Faz joins automáticos
- Retorna: `salons`, `loading`, `error`

### useAppointments
- Busca agendamentos do usuário
- **Inclui realtime subscription**
- Retorna: `appointments`, `loading`, `error`

### useProduct
- Busca produto individual
- **Inclui realtime subscription para atualizações**
- Retorna: `product`, `loading`, `error`

---

## Sistema de Tema

### CSS Variables (SSOT)
**Arquivo:** `src/styles/theme.css`

**Estrutura:**
- `:root` — Tema dark (padrão)
- `:root[data-theme="light"]` — Tema light
- Variáveis genéricas: `--color-primary`, `--color-background`, etc.
- Variáveis específicas: `--color-gold-500`, `--color-obsidian-900`, etc.

### Tailwind Config
**Arquivo:** `tailwind.config.ts`

Mapeia cores Tailwind para CSS variables:
```typescript
colors: {
  primary: 'var(--color-primary)',
  background: 'var(--color-background)',
  // ...
}
```

### Aplicação
- `AppContext` gerencia estado do tema
- `documentElement.setAttribute('data-theme', theme)` aplica tema
- CSS variables mudam automaticamente

---

## Realtime Subscriptions

### Appointments
```typescript
const channel = supabase
  .channel('appointments_changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'appointments',
    filter: `user_id=eq.${user.id}`,
  }, (payload) => {
    // Refetch appointments
  })
  .subscribe()
```

### Products
```typescript
const channel = supabase
  .channel(`product_${productId}`)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'products',
    filter: `id=eq.${productId}`,
  }, (payload) => {
    // Update product
  })
  .subscribe()
```

**Cleanup:** Sempre fazer `supabase.removeChannel(channel)` no `useEffect` cleanup.

---

## Estados UI Obrigatórios

Toda página com dados do Supabase DEVE ter:

### Loading State
```typescript
if (loading) {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="ml-3 text-muted">Carregando...</span>
    </div>
  )
}
```

### Error State
```typescript
if (error) {
  return (
    <div className="text-center py-20">
      <p className="text-error mb-4">{error}</p>
      <Button onClick={() => window.location.reload()}>
        Tentar novamente
      </Button>
    </div>
  )
}
```

### Empty State
```typescript
if (!loading && !error && data.length === 0) {
  return (
    <div className="text-center py-20">
      <p className="text-muted text-lg mb-4">Nenhum item encontrado</p>
    </div>
  )
}
```

---

## Validação Pré-Commit

**Arquivo:** `.husky/pre-commit`

Valida automaticamente:
1. Cores hex hardcoded
2. Classes Tailwind hardcoded
3. Mocks/fakes/placeholders
4. Build success

**Nenhum commit que viole a Matriz Gênesis será aceito.**

---

## Stack Tecnológica

- **React 19** — Framework UI
- **TypeScript 5.8** — Type safety
- **Vite 6** — Build tool
- **Tailwind CSS** — Utility-first CSS
- **shadcn/ui** — Component library
- **Supabase 2.39.3** — Backend (Auth + Database + Realtime)
- **Google Gemini 2.5 Pro** — IA para consultorias
- **Framer Motion** — Animações
- **React Router DOM** — Roteamento
- **Vercel** — Deploy e hosting

---

## Convenções de Código

### Imports
```typescript
// 1. React e bibliotecas externas
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Componentes UI
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 3. Hooks customizados
import { useProducts } from '@/hooks/useProducts'

// 4. Utilitários e libs
import { supabase } from '@/lib/supabaseClient'

// 5. Types
import { Product } from '@/types/ai'
```

### Nomenclatura
- Componentes: PascalCase (`ProductCard.tsx`)
- Hooks: camelCase com prefixo `use` (`useProducts.ts`)
- Utilitários: camelCase (`supabaseClient.ts`)
- Types: PascalCase (`Product`, `Salon`)

---

## Segurança

### Row Level Security (RLS)
- Produtos/Salões: Leitura pública
- Appointments/UGC: Apenas do próprio usuário
- Políticas configuradas em `supabase_schema.sql`

### Autenticação
- Supabase Auth completo
- Sessão persistente
- Proteção de rotas via `ProtectedRoute`

---

**Última atualização:** 26/12/2025  
**Status:** 🏆 Domínio Absoluto Alcançado

