-- ==================== SUPREMA BELEZA - AUDITORIA DO SCHEMA ====================
-- Execute este SQL no Supabase SQL Editor para auditar o estado atual do banco

-- 1. LISTAR TODAS AS TABELAS NO SCHEMA PUBLIC
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. VERIFICAR SE AS TABELAS CRÍTICAS EXISTEM
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products') 
    THEN '✅ products existe'
    ELSE '❌ products NÃO existe'
  END as products_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'salons') 
    THEN '✅ salons existe'
    ELSE '❌ salons NÃO existe'
  END as salons_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'professionals') 
    THEN '✅ professionals existe'
    ELSE '❌ professionals NÃO existe'
  END as professionals_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services') 
    THEN '✅ services existe'
    ELSE '❌ services NÃO existe'
  END as services_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'appointments') 
    THEN '✅ appointments existe'
    ELSE '❌ appointments NÃO existe'
  END as appointments_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'subscription_boxes') 
    THEN '✅ subscription_boxes existe'
    ELSE '❌ subscription_boxes NÃO existe'
  END as subscription_boxes_status,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ugc_content') 
    THEN '✅ ugc_content existe'
    ELSE '❌ ugc_content NÃO existe'
  END as ugc_content_status;

-- 3. LISTAR COLUNAS DE CADA TABELA (se existir)
-- Products
SELECT 
  'products' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'products'
ORDER BY ordinal_position;

-- Salons
SELECT 
  'salons' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'salons'
ORDER BY ordinal_position;

-- Professionals
SELECT 
  'professionals' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'professionals'
ORDER BY ordinal_position;

-- Services
SELECT 
  'services' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'services'
ORDER BY ordinal_position;

-- Appointments
SELECT 
  'appointments' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'appointments'
ORDER BY ordinal_position;

-- Subscription Boxes
SELECT 
  'subscription_boxes' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'subscription_boxes'
ORDER BY ordinal_position;

-- UGC Content
SELECT 
  'ugc_content' as tabela,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'ugc_content'
ORDER BY ordinal_position;

-- 4. VERIFICAR RLS (Row Level Security)
SELECT 
  schemaname,
  tablename,
  CASE 
    WHEN rowsecurity THEN '✅ RLS habilitado'
    ELSE '❌ RLS desabilitado'
  END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('products', 'salons', 'professionals', 'services', 'appointments', 'subscription_boxes', 'ugc_content')
ORDER BY tablename;

-- 5. CONTAR REGISTROS EM CADA TABELA (se existir)
SELECT 
  'products' as tabela,
  COUNT(*) as total_registros
FROM products
UNION ALL
SELECT 
  'salons' as tabela,
  COUNT(*) as total_registros
FROM salons
UNION ALL
SELECT 
  'professionals' as tabela,
  COUNT(*) as total_registros
FROM professionals
UNION ALL
SELECT 
  'services' as tabela,
  COUNT(*) as total_registros
FROM services
UNION ALL
SELECT 
  'appointments' as tabela,
  COUNT(*) as total_registros
FROM appointments
UNION ALL
SELECT 
  'subscription_boxes' as tabela,
  COUNT(*) as total_registros
FROM subscription_boxes
UNION ALL
SELECT 
  'ugc_content' as tabela,
  COUNT(*) as total_registros
FROM ugc_content;

