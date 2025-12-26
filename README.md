# SUPREMA BELEZA 5.0

![Domínio Absoluto Alcançado](https://img.shields.io/badge/Status-Domínio%20Absoluto%20Alcançado-00D4AA?style=for-the-badge&logo=vercel)
![Data de Conquista](https://img.shields.io/badge/Data-26%2F12%2F2025-FFD700?style=for-the-badge)
![Matriz Gênesis](https://img.shields.io/badge/Conformidade-100%25-00D4AA?style=for-the-badge)

> **Plataforma premium de beleza com 18 agentes IA, AR try-on, e-commerce de luxo e consultoria personalizada.**

**Deploy Live:** [🔗 Ver em Produção](https://suprema-beleza.vercel.app)

---

## 🚀 Stack Tecnológica

- **React 19** + **TypeScript 5.8** + **Vite 6**
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component library premium
- **Supabase 2.39.3** — Backend completo (Auth + Database + Realtime)
- **Google Gemini 2.5 Pro** — IA para consultorias personalizadas
- **Framer Motion** — Animações fluidas
- **React Router DOM** — Roteamento
- **Vercel** — Deploy e hosting

---

## ✨ Funcionalidades

### 🎨 18 Agentes IA Especializados
- Consultoria personalizada por categoria (cabelo, pele, make, wellness)
- Integração com Gemini 2.5 Pro
- Respostas instantâneas e recomendações técnicas

### 🛍️ E-commerce Premium
- Produtos curados de luxo
- Carrinho com persistência
- Checkout seguro via Stripe
- Subscription boxes personalizadas

### 📅 Sistema de Agendamento
- Rede de salões e profissionais credenciados
- Agendamento em tempo real
- Realtime updates de disponibilidade

### 🎭 AR Try-On
- Visualização de produtos em tempo real
- Tecnologia de realidade aumentada
- Integração com webcam

### 🌓 Tema Dinâmico
- Dark/Light mode funcional
- CSS variables (SSOT)
- Persistência de preferência

### 🔐 Autenticação Completa
- Supabase Auth integrado
- Sessão persistente
- Rotas protegidas por tier

---

## 📁 Estrutura do Projeto

```
src/
├── app/routes/       # Páginas da aplicação
├── components/ui/    # shadcn/ui components
├── components/layout/ # Header, Footer
├── hooks/            # Custom hooks (useProducts, useSalons, etc.)
├── lib/              # supabaseClient.ts (SSOT)
├── styles/           # theme.css (SSOT de cores)
└── contexts/         # AppContext, ToastContext
```

**Documentação completa:** [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

---

## 🛡️ Matriz Gênesis — Governança

Este projeto segue rigorosamente a **Matriz Gênesis (ALSHAM 360° PRIMA)**:

### As 6 Leis Sagradas

1. **Zero cores hardcoded** — Apenas CSS variables
2. **Componentes shadcn/ui obrigatórios** — Zero customizações desnecessárias
3. **Dados 100% reais** — Zero mocks, tudo do Supabase
4. **Temas dinâmicos** — Toggle funcional com persistência
5. **Estados UI completos** — Loading/error/empty em todas as páginas
6. **Estrutura canônica** — SSOT para tudo

**Documentação completa:** [`docs/MATRIZ_GENESIS.md`](./docs/MATRIZ_GENESIS.md)

### Arquivos de Governança

- [`.cursorrules`](./.cursorrules) — Regras para Cursor AI
- [`CLAUDE.md`](./CLAUDE.md) — Instruções para Claude AI
- [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) — Regras para GitHub Copilot
- [`docs/MATRIZ_GENESIS.md`](./docs/MATRIZ_GENESIS.md) — Leis Sagradas completas
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Arquitetura canônica

---

## 🚦 Validação Pré-Commit

O projeto inclui validação automática via `.husky/pre-commit`:

- ✅ Verifica cores hardcoded
- ✅ Verifica classes Tailwind hardcoded
- ✅ Verifica mocks/fakes
- ✅ Valida build success

**Nenhum commit que viole a Matriz Gênesis será aceito.**

---

## 🏗️ Setup Local

```bash
# Instalar dependências
npm install
# ou
pnpm install

# Configurar variáveis de ambiente
cp env.example .env.local
# Preencher VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY

# Executar schema do Supabase
# Executar supabase_schema.sql no Supabase SQL Editor

# Iniciar servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

---

## 📊 Status do Projeto

### ✅ Concluído

- [x] Autenticação Supabase completa
- [x] Sistema de tema dinâmico
- [x] Dados 100% reais (zero mocks)
- [x] Estados UI completos
- [x] Realtime subscriptions
- [x] Validação pré-commit
- [x] Documentação completa

### 🎯 Próximos Passos

- [ ] Sistema de fidelidade (loyalty points)
- [ ] Recomendações IA avançadas
- [ ] Analytics e métricas
- [ ] Testes automatizados

---

## 📚 Documentação

- [`docs/MATRIZ_GENESIS.md`](./docs/MATRIZ_GENESIS.md) — Leis Sagradas e manifesto
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Arquitetura detalhada
- [`COMMIT_INSTRUCTIONS.md`](./COMMIT_INSTRUCTIONS.md) — Guia de commits
- [`supabase_schema.sql`](./supabase_schema.sql) — Schema do banco de dados

---

## 🏆 Conquistas

**26 de Dezembro de 2025** — Domínio Absoluto da Matriz Gênesis alcançado.

- ✅ 100% conformidade com as 6 Leis Sagradas
- ✅ Zero cores hardcoded
- ✅ Zero mock data
- ✅ Estrutura canônica estabelecida
- ✅ Validação automática implementada
- ✅ Documentação completa

---

## 📝 Licença

Proprietário — ALSHAM SUPREMA BELEZA

---

**2026 é nosso.** 🏆
