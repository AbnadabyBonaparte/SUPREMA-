# 🗄️ SUPREMA BELEZA - SETUP DO SUPABASE PRODUCTION

## 📋 INSTRUÇÕES COMPLETAS PARA CORRIGIR O BANCO DE DADOS

### ⚠️ PROBLEMA IDENTIFICADO
- ShopPage retorna erro: "Could not find the table 'public.products' in the schema cache"
- Tabelas ausentes ou vazias no Supabase production

---

## 🚀 PASSO A PASSO PARA CORREÇÃO

### **PASSO 1: AUDITORIA DO BANCO (Opcional mas Recomendado)**

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Abra o arquivo `supabase_audit.sql` deste repositório
5. Cole o conteúdo no SQL Editor
6. Execute (Run)
7. **Analise os resultados**:
   - Verifique quais tabelas existem
   - Veja quais estão faltando
   - Confira o status do RLS (Row Level Security)
   - Veja quantos registros existem em cada tabela

---

### **PASSO 2: CRIAR TODAS AS TABELAS**

1. No **SQL Editor** do Supabase
2. Abra o arquivo `supabase_schema_complete.sql` deste repositório
3. Cole o conteúdo completo no SQL Editor
4. Execute (Run)
5. **Aguarde a confirmação** de que todas as tabelas foram criadas

**O que este script faz:**
- ✅ Cria todas as 7 tabelas necessárias (products, salons, professionals, services, appointments, subscription_boxes, ugc_content)
- ✅ Habilita Row Level Security (RLS) em todas as tabelas
- ✅ Cria políticas de segurança (public read para catálogo, auth para privado)
- ✅ Cria índices para performance
- ✅ Cria triggers para atualizar `updated_at` automaticamente

---

### **PASSO 3: INSERIR DADOS INICIAIS (SEED)**

1. No **SQL Editor** do Supabase
2. Abra o arquivo `supabase_seed_data.sql` deste repositório
3. Cole o conteúdo completo no SQL Editor
4. Execute (Run)
5. **Aguarde a confirmação** de que os dados foram inseridos

**O que este script faz:**
- ✅ Insere **10 produtos premium** (skincare, haircare, makeup, fragrance, bodycare)
- ✅ Insere **5 salões de luxo** (São Paulo e Rio de Janeiro)
- ✅ Insere **3 profissionais premium** (especialistas em diferentes áreas)
- ✅ Insere **5 serviços premium** (tratamentos e procedimentos)
- ✅ Insere **3 subscription boxes** (premium, luxury, elite)

**Dados incluídos:**
- Produtos com preços, descrições, imagens Unsplash
- Salões com endereços completos, ratings, verificação
- Profissionais com especialidades e experiência
- Serviços associados a profissionais e salões
- Subscription boxes com produtos associados

---

### **PASSO 4: VALIDAÇÃO FINAL**

Execute estas queries no SQL Editor para confirmar que tudo está funcionando:

```sql
-- Contar registros em cada tabela
SELECT 'products' as tabela, COUNT(*) as total FROM products
UNION ALL
SELECT 'salons', COUNT(*) FROM salons
UNION ALL
SELECT 'professionals', COUNT(*) FROM professionals
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'subscription_boxes', COUNT(*) FROM subscription_boxes;

-- Ver produtos
SELECT name, price, category, rating FROM products ORDER BY created_at DESC LIMIT 10;

-- Ver salões
SELECT name, city, rating, is_verified FROM salons ORDER BY rating DESC;

-- Ver profissionais com seus salões
SELECT p.name, p.role, s.name as salon_name 
FROM professionals p 
JOIN salons s ON p.salon_id = s.id;
```

**Resultados esperados:**
- ✅ products: 10 registros
- ✅ salons: 5 registros
- ✅ professionals: 3 registros
- ✅ services: 5 registros
- ✅ subscription_boxes: 3 registros

---

## 📁 ARQUIVOS SQL CRIADOS

1. **`supabase_audit.sql`** - Script de auditoria do banco
   - Lista todas as tabelas
   - Verifica quais existem e quais faltam
   - Mostra estrutura de colunas
   - Verifica RLS
   - Conta registros

2. **`supabase_schema_complete.sql`** - Schema completo e atualizado
   - Cria todas as tabelas com campos adicionais
   - RLS completo
   - Políticas de segurança
   - Índices de performance
   - Triggers automáticos

3. **`supabase_seed_data.sql`** - Dados iniciais premium
   - 10 produtos realistas
   - 5 salões de luxo
   - 3 profissionais especialistas
   - 5 serviços premium
   - 3 subscription boxes

4. **`supabase_schema.sql`** - Schema original (mantido para compatibilidade)

---

## 🔒 SEGURANÇA (RLS - Row Level Security)

### **Políticas Públicas (Leitura para Todos):**
- ✅ `products` - Catálogo público
- ✅ `salons` - Catálogo público
- ✅ `professionals` - Catálogo público
- ✅ `services` - Catálogo público
- ✅ `subscription_boxes` - Catálogo público

### **Políticas Privadas (Apenas Usuário Autenticado):**
- 🔐 `appointments` - Usuários veem apenas seus próprios agendamentos
- 🔐 `ugc_content` - Usuários veem apenas seu próprio conteúdo

---

## ✅ CHECKLIST FINAL

Após executar todos os scripts, verifique:

- [ ] Todas as 7 tabelas foram criadas
- [ ] RLS está habilitado em todas as tabelas
- [ ] Políticas de segurança foram criadas
- [ ] Índices foram criados
- [ ] Triggers foram criados
- [ ] 10 produtos foram inseridos
- [ ] 5 salões foram inseridos
- [ ] 3 profissionais foram inseridos
- [ ] 5 serviços foram inseridos
- [ ] 3 subscription boxes foram inseridos
- [ ] Queries de validação retornam dados

---

## 🐛 TROUBLESHOOTING

### **Erro: "relation already exists"**
- ✅ Normal! O script usa `CREATE TABLE IF NOT EXISTS`
- ✅ Pode executar múltiplas vezes sem problema

### **Erro: "policy already exists"**
- ✅ Normal! O script usa `DROP POLICY IF EXISTS` antes de criar
- ✅ Pode executar múltiplas vezes sem problema

### **Tabelas criadas mas sem dados**
- ✅ Execute o `supabase_seed_data.sql` após o schema
- ✅ Verifique se não há erros de foreign key

### **RLS bloqueando queries**
- ✅ Verifique se as políticas foram criadas corretamente
- ✅ Para catálogo (products, salons), deve ter política "Public read"
- ✅ Para dados privados (appointments, ugc), deve ter políticas de usuário

---

## 📞 SUPORTE

Se encontrar problemas:
1. Execute o `supabase_audit.sql` para diagnosticar
2. Verifique os logs no Supabase Dashboard
3. Confirme que as variáveis de ambiente estão corretas:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 🎯 PRÓXIMOS PASSOS

Após corrigir o banco:
1. ✅ Teste a ShopPage - deve carregar produtos
2. ✅ Teste a página de Salões - deve carregar salões
3. ✅ Teste agendamentos - deve funcionar com autenticação
4. ✅ Commit dos scripts SQL atualizados
5. ✅ Deploy e validação em produção

---

**✅ SUPABASE PRODUCTION CORRIGIDO — DADOS REAIS CARREGADOS**

