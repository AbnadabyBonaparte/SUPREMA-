# 🚀 ALSHAM SUPREMA BELEZA - CONFIGURAÇÃO STRIPE WEBHOOK

> **Guia completo para configurar o sistema de webhooks do Stripe com integração n8n**

---

## 📋 **RESUMO DO QUE FOI IMPLEMENTADO**

✅ **Servidor Express.js** completo para webhooks do Stripe  
✅ **Verificação segura** com `stripe.webhooks.constructEvent`  
✅ **Tratamento de eventos**: checkout.session.completed, customer.subscription.*  
✅ **Integração Supabase** com tabela `subscriptions`  
✅ **Integração n8n** para automações  
✅ **Componente React** para gerenciar assinaturas  
✅ **Sistema completo** de retry e logs  

---

## 🏗️ **ARQUITETURA IMPLEMENTADA**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   STRIPE        │    │   WEBHOOK        │    │   SUPABASE      │
│   Dashboard     │───▶│   SERVER         │───▶│   Database      │
│                 │    │   (Express.js)   │    │   subscriptions │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   N8N           │
                       │   Automations   │
                       └─────────────────┘
```

---

## 📁 **ARQUIVOS CRIADOS/MODIFICADOS**

### **Novos Arquivos:**
- `server/index.ts` - Servidor principal de webhooks
- `server/routes/stripe.ts` - Rotas de API do Stripe
- `src/services/stripe.ts` - Cliente Stripe para React
- `src/components/SubscriptionManager.tsx` - Interface de gerenciamento
- `database/subscriptions.sql` - Schema do banco de dados
- `env.example` - Variáveis de ambiente necessárias

### **Arquivos Modificados:**
- `package.json` - Dependências e scripts
- `src/lib/env.ts` - Validação de env vars
- `src/vite-env.d.ts` - Tipos TypeScript

---

## ⚙️ **CONFIGURAÇÃO PASSO A PASSO**

### **1. Instalar Dependências**

```bash
npm install express cors stripe @supabase/supabase-js zod
npm install -D @types/express @types/cors concurrently
```

### **2. Configurar Variáveis de Ambiente**

Copie o arquivo `env.example` para `.env` e preencha:

```bash
cp env.example .env
```

**Variáveis obrigatórias:**
```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase  
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
VITE_SUPABASE_ANON_KEY=eyJ...

# n8n
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/subscription-events

# Server
PORT=3001
```

### **3. Configurar Banco de Dados (Supabase)**

1. Acesse o **SQL Editor** no Supabase
2. Execute o conteúdo do arquivo `database/subscriptions.sql`
3. Isso criará:
   - Tabela `subscriptions`
   - Índices para performance
   - Políticas RLS (Row Level Security)
   - Funções auxiliares

### **4. Configurar Webhook no Stripe**

1. Acesse o [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Clique em **"Add endpoint"**
3. Configure:
   - **URL**: `https://seu-dominio.com/api/stripe/webhook`
   - **Eventos**:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
4. Copie o **Signing Secret** para `STRIPE_WEBHOOK_SECRET`

### **5. Configurar Produtos no Stripe**

Crie os produtos no Stripe Dashboard:

```javascript
// Exemplo de produtos
{
  "pro": {
    "name": "Alsham Pro",
    "price": 39.90,
    "priceId": "price_1234567890" // Cole o ID real aqui
  },
  "premium": {
    "name": "Alsham Premium", 
    "price": 79.90,
    "priceId": "price_0987654321" // Cole o ID real aqui
  },
  "luxury": {
    "name": "Alsham Luxury",
    "price": 149.90,
    "priceId": "price_1122334455" // Cole o ID real aqui
  }
}
```

**Atualize os `priceId` em `src/services/stripe.ts`:**

```typescript
export const PLANS: Record<string, PlanConfig> = {
  pro: {
    // ...
    priceId: 'price_SEU_ID_REAL_AQUI', // ← Substitua
  },
  // ...
};
```

### **6. Configurar n8n (Opcional)**

1. Crie um workflow no n8n
2. Adicione um **Webhook Trigger**
3. Configure para receber POST requests
4. Copie a URL do webhook para `N8N_WEBHOOK_URL`

**Exemplo de payload que será enviado:**
```json
{
  "event": "subscription_active",
  "user_id": "uuid-do-usuario",
  "plan": "pro",
  "subscription_id": "sub_stripe_id",
  "customer_id": "cus_stripe_id",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## 🚀 **EXECUTAR O PROJETO**

### **Desenvolvimento (Frontend + Backend):**
```bash
npm run dev:full
```

### **Apenas Frontend:**
```bash
npm run dev
```

### **Apenas Servidor de Webhooks:**
```bash
npm run dev:server
```

### **Build para Produção:**
```bash
npm run build
npm run build:server
```

### **Executar em Produção:**
```bash
npm start
```

---

## 🔍 **ENDPOINTS DISPONÍVEIS**

### **Webhooks:**
- `POST /api/stripe/webhook` - Webhook do Stripe

### **API Routes:**
- `POST /api/stripe/create-checkout-session` - Criar sessão de checkout
- `POST /api/stripe/create-portal-session` - Criar sessão do portal
- `GET /api/stripe/subscription/:userId` - Buscar subscription do usuário
- `GET /api/stripe/subscriptions/:userId` - Histórico de subscriptions
- `POST /api/stripe/cancel-subscription` - Cancelar subscription
- `GET /api/stripe/plans` - Listar planos disponíveis

### **Health Checks:**
- `GET /health` - Status do servidor
- `GET /api/stripe/health` - Status das integrações

---

## 🧪 **TESTANDO A INTEGRAÇÃO**

### **1. Testar Health Checks:**
```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/stripe/health
```

### **2. Testar Webhook Localmente:**

Use o **Stripe CLI** para encaminhar webhooks:

```bash
# Instalar Stripe CLI
npm install -g stripe-cli

# Login no Stripe
stripe login

# Encaminhar webhooks para localhost
stripe listen --forward-to localhost:3001/api/stripe/webhook
```

### **3. Simular Eventos:**
```bash
# Simular subscription criada
stripe trigger customer.subscription.created

# Simular checkout completado
stripe trigger checkout.session.completed
```

---

## 📊 **MONITORAMENTO E LOGS**

### **Logs do Servidor:**
O servidor registra todos os eventos importantes:

```
✅ Webhook verificado com sucesso: customer.subscription.created
🎯 Processando customer.subscription.created
✅ Subscription atualizada no Supabase: {...}
✅ Evento enviado para n8n: {...}
```

### **Monitorar no Stripe Dashboard:**
- Vá em **Developers > Webhooks**
- Clique no seu webhook
- Veja **Recent deliveries** para status das tentativas

### **Verificar no Supabase:**
```sql
-- Ver subscriptions ativas
SELECT * FROM active_subscriptions;

-- Ver histórico de subscriptions
SELECT * FROM subscriptions ORDER BY created_at DESC;

-- Verificar usuário específico
SELECT * FROM subscriptions WHERE user_id = 'uuid-do-usuario';
```

---

## 🔒 **SEGURANÇA E BOAS PRÁTICAS**

### **Implementado:**
✅ Verificação de assinatura do webhook com `STRIPE_WEBHOOK_SECRET`  
✅ Validação de dados com Zod schemas  
✅ Row Level Security (RLS) no Supabase  
✅ CORS configurado para domínios específicos  
✅ Logs detalhados para auditoria  
✅ Tratamento de erro robusto  

### **Recomendações Adicionais:**
- Use HTTPS em produção
- Rotacione secrets regularmente
- Monitor logs de erro
- Configure alertas para falhas de webhook
- Implemente rate limiting se necessário

---

## 🚨 **TROUBLESHOOTING**

### **Webhook não está sendo chamado:**
1. Verifique se a URL está acessível publicamente
2. Confirme se os eventos estão selecionados no Stripe
3. Use `stripe listen` para testar localmente

### **Erro de verificação de assinatura:**
1. Confirme se `STRIPE_WEBHOOK_SECRET` está correto
2. Verifique se o raw body está sendo usado
3. Não use middleware JSON antes do webhook

### **Erro de conexão com Supabase:**
1. Verifique `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
2. Confirme se a tabela `subscriptions` existe
3. Verifique políticas RLS

### **n8n não recebe eventos:**
1. Teste a URL do webhook manualmente
2. Verifique se o n8n está acessível
3. Confirme se o payload está no formato correto

---

## 📞 **SUPORTE**

Para dúvidas ou problemas:

- **Email**: suporte@alsham.com.br
- **Documentação Stripe**: https://stripe.com/docs/webhooks
- **Documentação Supabase**: https://supabase.com/docs
- **Documentação n8n**: https://docs.n8n.io

---

## 🎉 **CONCLUSÃO**

O sistema de webhooks do Stripe está completamente implementado e pronto para produção! 

**Principais benefícios:**
- ✅ Processamento automático de pagamentos
- ✅ Sincronização em tempo real com Supabase  
- ✅ Automações via n8n
- ✅ Interface React para gerenciar assinaturas
- ✅ Logs e monitoramento completo
- ✅ Segurança enterprise-grade

**Próximos passos:**
1. Configure as variáveis de ambiente
2. Execute o SQL no Supabase
3. Configure o webhook no Stripe
4. Teste a integração
5. Deploy em produção

🚀 **Seu sistema de subscriptions está pronto para escalar!**
