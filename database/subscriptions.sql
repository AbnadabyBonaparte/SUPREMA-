-- ==================== TABELA SUBSCRIPTIONS ====================
-- Schema para gerenciar assinaturas do Stripe no Supabase
-- Execute este SQL no SQL Editor do Supabase

-- Criar tabela subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete', 'trialing')),
  plan_id TEXT NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==================== POLÍTICAS RLS (Row Level Security) ====================

-- Habilitar RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas suas próprias subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Política para usuários atualizarem apenas suas próprias subscriptions
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para service role (webhooks) ter acesso completo
CREATE POLICY "Service role has full access" ON subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- ==================== TABELA USERS (se não existir) ====================
-- Adicionar coluna stripe_customer_id na tabela users se necessário

-- Verificar se a tabela users existe e adicionar coluna se necessário
DO $$ 
BEGIN
    -- Tentar adicionar a coluna stripe_customer_id se não existir
    BEGIN
        ALTER TABLE users ADD COLUMN stripe_customer_id TEXT;
    EXCEPTION 
        WHEN duplicate_column THEN 
            -- Coluna já existe, não fazer nada
            NULL;
    END;
    
    -- Criar índice se não existir
    BEGIN
        CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);
    EXCEPTION 
        WHEN duplicate_table THEN 
            -- Índice já existe, não fazer nada
            NULL;
    END;
END $$;

-- ==================== VIEWS ÚTEIS ====================

-- View para subscriptions ativas
CREATE OR REPLACE VIEW active_subscriptions AS
SELECT 
  s.*,
  u.email,
  u.name
FROM subscriptions s
LEFT JOIN users u ON s.user_id = u.id
WHERE s.status = 'active'
  AND s.current_period_end > NOW();

-- View para subscriptions expiradas/canceladas
CREATE OR REPLACE VIEW expired_subscriptions AS
SELECT 
  s.*,
  u.email,
  u.name
FROM subscriptions s
LEFT JOIN users u ON s.user_id = u.id
WHERE s.status IN ('canceled', 'past_due')
  OR (s.status = 'active' AND s.current_period_end <= NOW());

-- ==================== FUNÇÕES AUXILIARES ====================

-- Função para verificar se usuário tem subscription ativa
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM subscriptions 
    WHERE user_id = user_uuid 
      AND status = 'active' 
      AND current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter plano atual do usuário
CREATE OR REPLACE FUNCTION get_user_plan(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  user_plan TEXT;
BEGIN
  SELECT plan_id INTO user_plan
  FROM subscriptions 
  WHERE user_id = user_uuid 
    AND status = 'active' 
    AND current_period_end > NOW()
  ORDER BY created_at DESC
  LIMIT 1;
  
  RETURN COALESCE(user_plan, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==================== DADOS DE EXEMPLO (OPCIONAL) ====================
-- Descomente para inserir dados de teste

/*
-- Inserir planos de exemplo
INSERT INTO subscriptions (
  user_id,
  stripe_customer_id, 
  stripe_subscription_id,
  status,
  plan_id,
  current_period_end
) VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  'cus_test123',
  'sub_test123', 
  'active',
  'pro',
  NOW() + INTERVAL '1 month'
),
(
  '00000000-0000-0000-0000-000000000002',
  'cus_test456',
  'sub_test456',
  'active', 
  'premium',
  NOW() + INTERVAL '1 month'
);
*/

-- ==================== COMENTÁRIOS E DOCUMENTAÇÃO ====================

COMMENT ON TABLE subscriptions IS 'Tabela para gerenciar assinaturas do Stripe integradas com Supabase';
COMMENT ON COLUMN subscriptions.user_id IS 'ID do usuário (FK para auth.users)';
COMMENT ON COLUMN subscriptions.stripe_customer_id IS 'ID do customer no Stripe';
COMMENT ON COLUMN subscriptions.stripe_subscription_id IS 'ID da subscription no Stripe (único)';
COMMENT ON COLUMN subscriptions.status IS 'Status da subscription: active, canceled, past_due, incomplete, trialing';
COMMENT ON COLUMN subscriptions.plan_id IS 'Identificador do plano: pro, premium, luxury';
COMMENT ON COLUMN subscriptions.current_period_end IS 'Data de fim do período atual da subscription';

-- ==================== VERIFICAÇÕES FINAIS ====================

-- Verificar se tudo foi criado corretamente
SELECT 
  'subscriptions table' as object_type,
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'subscriptions') as exists
UNION ALL
SELECT 
  'RLS enabled',
  (SELECT row_security FROM pg_tables WHERE tablename = 'subscriptions')::boolean
UNION ALL  
SELECT
  'Policies count',
  (SELECT COUNT(*)::boolean FROM pg_policies WHERE tablename = 'subscriptions')
UNION ALL
SELECT
  'Indexes count', 
  (SELECT COUNT(*)::boolean FROM pg_indexes WHERE tablename = 'subscriptions');

-- Mostrar estrutura da tabela
\d subscriptions;
