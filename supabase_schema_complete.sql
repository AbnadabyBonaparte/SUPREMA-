-- ==================== SUPREMA BELEZA - SCHEMA COMPLETO ====================
-- Execute este SQL no Supabase SQL Editor para criar TODAS as tabelas necessárias
-- Este script é idempotente (pode ser executado múltiplas vezes sem erro)

-- ==================== DROP EXISTING TABLES (CUIDADO: APAGA DADOS) ====================
-- Descomente apenas se quiser recriar tudo do zero
-- DROP TABLE IF EXISTS ugc_content CASCADE;
-- DROP TABLE IF EXISTS appointments CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS professionals CASCADE;
-- DROP TABLE IF EXISTS subscription_boxes CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS salons CASCADE;

-- ==================== PRODUCTS TABLE ====================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category TEXT NOT NULL,
  brand TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  image TEXT,
  images TEXT[],
  is_new BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sustainability_score INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== SALONS TABLE ====================
CREATE TABLE IF NOT EXISTS salons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  image TEXT,
  images TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  distance TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== PROFESSIONALS TABLE ====================
CREATE TABLE IF NOT EXISTS professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  specialties TEXT[],
  experience_years INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== SERVICES TABLE ====================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration TEXT,
  duration_minutes INTEGER,
  category TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== APPOINTMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  salon_id UUID REFERENCES salons(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES professionals(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service TEXT NOT NULL,
  service_price DECIMAL(10, 2),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== SUBSCRIPTION BOXES TABLE ====================
CREATE TABLE IF NOT EXISTS subscription_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  products UUID[],
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== UGC CONTENT TABLE ====================
CREATE TABLE IF NOT EXISTS ugc_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image TEXT,
  video TEXT,
  caption TEXT,
  products_mentioned UUID[],
  approved BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== ENABLE ROW LEVEL SECURITY (RLS) ====================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ugc_content ENABLE ROW LEVEL SECURITY;

-- ==================== DROP EXISTING POLICIES (para recriar) ====================
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Public read salons" ON salons;
DROP POLICY IF EXISTS "Public read professionals" ON professionals;
DROP POLICY IF EXISTS "Public read services" ON services;
DROP POLICY IF EXISTS "Public read subscription_boxes" ON subscription_boxes;
DROP POLICY IF EXISTS "Users see own appointments" ON appointments;
DROP POLICY IF EXISTS "Users insert own appointments" ON appointments;
DROP POLICY IF EXISTS "Users update own appointments" ON appointments;
DROP POLICY IF EXISTS "Users delete own appointments" ON appointments;
DROP POLICY IF EXISTS "Users see own ugc" ON ugc_content;
DROP POLICY IF EXISTS "Users insert own ugc" ON ugc_content;
DROP POLICY IF EXISTS "Users update own ugc" ON ugc_content;
DROP POLICY IF EXISTS "Users delete own ugc" ON ugc_content;

-- ==================== RLS POLICIES: PUBLIC READ ====================
-- Products: leitura pública para catálogo
CREATE POLICY "Public read products" ON products 
  FOR SELECT 
  USING (true);

-- Salons: leitura pública para catálogo
CREATE POLICY "Public read salons" ON salons 
  FOR SELECT 
  USING (true);

-- Professionals: leitura pública para catálogo
CREATE POLICY "Public read professionals" ON professionals 
  FOR SELECT 
  USING (true);

-- Services: leitura pública para catálogo
CREATE POLICY "Public read services" ON services 
  FOR SELECT 
  USING (true);

-- Subscription Boxes: leitura pública para catálogo
CREATE POLICY "Public read subscription_boxes" ON subscription_boxes 
  FOR SELECT 
  USING (true);

-- ==================== RLS POLICIES: USER-SPECIFIC ====================
-- Appointments: usuários veem apenas seus próprios agendamentos
CREATE POLICY "Users see own appointments" ON appointments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own appointments" ON appointments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own appointments" ON appointments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own appointments" ON appointments 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- UGC Content: usuários veem apenas seu próprio conteúdo
CREATE POLICY "Users see own ugc" ON ugc_content 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own ugc" ON ugc_content 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own ugc" ON ugc_content 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own ugc" ON ugc_content 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- ==================== CREATE INDEXES FOR PERFORMANCE ====================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku) WHERE sku IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_salons_rating ON salons(rating DESC);
CREATE INDEX IF NOT EXISTS idx_salons_is_verified ON salons(is_verified) WHERE is_verified = true;
CREATE INDEX IF NOT EXISTS idx_salons_city ON salons(city) WHERE city IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_professionals_salon_id ON professionals(salon_id);
CREATE INDEX IF NOT EXISTS idx_professionals_rating ON professionals(rating DESC);

CREATE INDEX IF NOT EXISTS idx_services_professional_id ON services(professional_id);
CREATE INDEX IF NOT EXISTS idx_services_salon_id ON services(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category) WHERE category IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_salon_id ON appointments(salon_id);

CREATE INDEX IF NOT EXISTS idx_ugc_user_id ON ugc_content(user_id);
CREATE INDEX IF NOT EXISTS idx_ugc_approved ON ugc_content(approved) WHERE approved = true;

-- ==================== CREATE UPDATED_AT TRIGGER FUNCTION ====================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==================== CREATE TRIGGERS FOR UPDATED_AT ====================
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_salons_updated_at ON salons;
CREATE TRIGGER update_salons_updated_at
  BEFORE UPDATE ON salons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_professionals_updated_at ON professionals;
CREATE TRIGGER update_professionals_updated_at
  BEFORE UPDATE ON professionals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscription_boxes_updated_at ON subscription_boxes;
CREATE TRIGGER update_subscription_boxes_updated_at
  BEFORE UPDATE ON subscription_boxes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ugc_content_updated_at ON ugc_content;
CREATE TRIGGER update_ugc_content_updated_at
  BEFORE UPDATE ON ugc_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==================== VERIFICATION QUERIES ====================
-- Execute estas queries após criar o schema para verificar:

-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
-- SELECT COUNT(*) FROM products;
-- SELECT COUNT(*) FROM salons;
-- SELECT COUNT(*) FROM professionals;
-- SELECT COUNT(*) FROM services;
-- SELECT COUNT(*) FROM subscription_boxes;

