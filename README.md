# SUPREMA BELEZA 5.0

![Domínio Absoluto Alcançado](https://img.shields.io/badge/Status-Domínio%20Absoluto%20Alcançado-00D4AA?style=for-the-badge&logo=vercel)
![Data de Conquista](https://img.shields.io/badge/Data-26%2F12%2F2025-FFD700?style=for-the-badge)
![Matriz Gênesis](https://img.shields.io/badge/Conformidade-100%25-00D4AA?style=for-the-badge)

> **Plataforma premium de beleza com 18 agentes IA, AR try-on, e-commerce de luxo e consultoria personalizada.**

**Deploy Live:** [🔗 Ver em Produção](https://suprema-beleza.vercel.app)

**Construído com Matriz Gênesis** — Governança ALSHAM 360° PRIMA

---

## 🚀 Stack Tecnológica

- **React 19** + **TypeScript 5.8** + **Vite 6**
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component library premium
- **Supabase 2.39.3** — Backend completo (Auth + Database + Realtime)
- **AI Abstraction Layer** — Provider-agnostic (Gemini, Grok, Claude, Local)
- **Framer Motion** — Animações fluidas
- **React Router DOM** — Roteamento
- **Vercel** — Deploy e hosting

---

## ✨ Funcionalidades

### 🤖 Inteligência Artificial Completa

#### **AURA — Assistente Global**
- Chat com IA em todas as páginas (botão flutuante)
- Histórico persistente de conversas
- Respostas instantâneas e personalizadas
- **Como usar:** Clique no botão flutuante (canto inferior direito) e comece a conversar

#### **AR Try-On Virtual**
- Visualização de produtos em tempo real com webcam
- Processamento de imagem via IA
- Upload de foto como alternativa
- Download de resultado
- **Como usar:** Na página do produto, clique em "Try-On" e capture/fazer upload de foto

#### **Sustainability Scanner**
- Análise real de ingredientes via IA
- Score 0-100 de sustentabilidade
- Breakdown detalhado de problemas e alternativas
- Upload de foto do rótulo ou input manual
- **Como usar:** Acesse `/sustainability`, faça upload ou digite ingredientes, e receba análise completa

#### **18 Agentes IA Especializados**
- Consultoria personalizada por categoria (cabelo, pele, make, wellness)
- Integração via camada de abstração (provider-agnostic)
- Respostas instantâneas e recomendações técnicas
- **Como usar:** Acesse o Matrix Hub e escolha seu agente especializado

### 🛍️ E-commerce Premium
- Produtos curados de luxo
- Carrinho com persistência
- Checkout seguro via Stripe
- Subscription boxes personalizadas

### 📅 Sistema de Agendamento
- Rede de salões e profissionais credenciados
- Agendamento em tempo real
- Realtime updates de disponibilidade

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
├── components/ai/    # AURA, SmartConsultation, ImageStudio, Chat
├── hooks/            # Custom hooks (useProducts, useSalons, etc.)
├── lib/              # supabaseClient.ts (SSOT)
├── services/ai/      # Camada de abstração de IA
│   ├── aiService.ts  # Interface abstrata
│   ├── adapters/     # Gemini, Grok, Claude, Local
│   └── index.ts      # Provider selection
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
# Preencher:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_GOOGLE_API_KEY (para Gemini)
# - VITE_AI_PROVIDER=gemini (ou grok, claude, local)

# Executar schema do Supabase
# Executar supabase_schema.sql no Supabase SQL Editor

# Iniciar servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

---

## 🤖 Configuração de IA

### Provider de IA

O sistema usa uma **camada de abstração** que permite trocar de provedor de IA sem alterar código:

```bash
# No .env.local
VITE_AI_PROVIDER=gemini  # ou grok, claude, local
```

**Providers disponíveis:**
- `gemini` (padrão) — Google Gemini 2.5 Pro
- `grok` — X.AI Grok (placeholder)
- `claude` — Anthropic Claude (placeholder)
- `local` — Modelos locais como Ollama (placeholder)

**Para adicionar novo provider:**
1. Criar adapter em `src/services/ai/adapters/`
2. Implementar interface `IAIService`
3. Adicionar ao registro em `src/services/ai/index.ts`

### Funcionalidades de IA

#### **AURA (GlobalAssistant)**
- Disponível em todas as páginas via botão flutuante
- Histórico persistente no localStorage
- Respostas em tempo real

#### **AR Try-On**
- Processamento via `aiService.editImage()`
- Aplicação realista de produtos
- Suporte a webcam e upload

#### **Sustainability Scanner**
- Análise via `aiService.analyzeIngredients()`
- Score 0-100 com breakdown detalhado
- Recomendações de alternativas

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
- [x] **Camada de abstração de IA (Escudo Anti-Refém)**
- [x] **AURA completa com IA real**
- [x] **AR Try-On real com webcam + IA**
- [x] **Sustainability Scanner refinado**
- [x] **Performance otimizada (lazy loading, memoização)**
- [x] **Meta tags Open Graph**

### 🎯 Próximos Passos

- [ ] Sistema de fidelidade (loyalty points)
- [ ] Recomendações IA avançadas
- [ ] Analytics e métricas
- [ ] Testes automatizados
- [ ] OCR para extração automática de ingredientes

---

## 📚 Documentação

- [`docs/MATRIZ_GENESIS.md`](./docs/MATRIZ_GENESIS.md) — Leis Sagradas e manifesto
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Arquitetura detalhada
- [`docs/ANALISE_ESTRATEGICA_FUSAO.md`](./docs/ANALISE_ESTRATEGICA_FUSAO.md) — Análise estratégica
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
- ✅ **Camada de abstração de IA (liberdade total)**
- ✅ **AURA, Try-On e Scanner 100% funcionais**
- ✅ **Performance otimizada**
- ✅ **Meta tags e SEO**

---

## 📝 Licença

Proprietário — ALSHAM SUPREMA BELEZA

---

**Construído com Matriz Gênesis — Governança ALSHAM 360° PRIMA**

**2026 é nosso.** 🏆
