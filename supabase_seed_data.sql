-- ==================== SUPREMA BELEZA - SEED DATA PREMIUM ====================
-- Execute este SQL no Supabase SQL Editor APÓS executar supabase_schema_complete.sql
-- Este script insere dados realistas e premium para produção

-- ==================== CLEAR EXISTING DATA (OPCIONAL) ====================
-- Descomente apenas se quiser limpar dados existentes antes de inserir
-- TRUNCATE TABLE ugc_content CASCADE;
-- TRUNCATE TABLE appointments CASCADE;
-- TRUNCATE TABLE services CASCADE;
-- TRUNCATE TABLE professionals CASCADE;
-- TRUNCATE TABLE subscription_boxes CASCADE;
-- TRUNCATE TABLE products CASCADE;
-- TRUNCATE TABLE salons CASCADE;

-- ==================== PRODUCTS - 10 PRODUTOS PREMIUM ====================
INSERT INTO products (name, description, price, original_price, category, brand, rating, reviews_count, image, images, is_new, is_best_seller, is_featured, sustainability_score, stock, sku) VALUES
('Sérum Vitamina C Soberano', 'Sérum facial com 20% de vitamina C pura, ácido hialurônico e pérolas de ouro. Ilumina, uniformiza e previne sinais de envelhecimento.', 890.00, 1290.00, 'skincare', 'Suprema Beleza', 4.9, 342, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800'], true, true, true, 95, 50, 'SB-VC-001'),
('Creme Noturno Obsidiana', 'Creme regenerador noturno com ácido retinoico, colágeno marinho e óleo de semente de uva. Recuperação profunda durante o sono.', 1250.00, 1890.00, 'skincare', 'Suprema Beleza', 4.8, 289, 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800', ARRAY['https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800'], false, true, true, 88, 35, 'SB-CN-002'),
('Máscara de Ouro 24K', 'Máscara facial com partículas de ouro 24K, argila branca e ácido glicólico. Tratamento de luxo para pele radiante.', 1890.00, 2490.00, 'skincare', 'Suprema Beleza', 5.0, 156, 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800', ARRAY['https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800'], true, false, true, 75, 20, 'SB-MO-003'),
('Shampoo Reparador Diamante', 'Shampoo reparador com queratina, óleo de argan e pérolas. Restaura fios danificados, brilho intenso.', 450.00, 650.00, 'haircare', 'Suprema Beleza', 4.7, 523, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70e0d2?w=800', ARRAY['https://images.unsplash.com/photo-1608248543803-ba4f8c70e0d2?w=800'], false, true, false, 92, 100, 'SB-SR-004'),
('Condicionador Hidratante Premium', 'Condicionador com manteiga de karité, óleo de coco e proteínas de seda. Hidratação profunda e maciez duradoura.', 420.00, 580.00, 'haircare', 'Suprema Beleza', 4.6, 487, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800', ARRAY['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800'], false, false, false, 90, 120, 'SB-CH-005'),
('Perfume Soberano Ouro', 'Fragrância exclusiva com notas de bergamota, jasmim, baunilha e âmbar. Longa duração, elegância suprema.', 1890.00, 2490.00, 'fragrance', 'Suprema Beleza', 4.9, 234, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800', ARRAY['https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'], true, true, true, 70, 30, 'SB-PO-006'),
('Batom Líquido Matte Premium', 'Batom líquido de longa duração, acabamento matte, 12 cores disponíveis. Pigmentação intensa, não resseca.', 180.00, 250.00, 'makeup', 'Suprema Beleza', 4.8, 892, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', ARRAY['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800'], false, true, false, 85, 200, 'SB-BL-007'),
('Paleta de Sombras Obsidiana', 'Paleta com 12 sombras matte e 4 metálicas. Pigmentação profissional, fácil de esfumar.', 320.00, 450.00, 'makeup', 'Suprema Beleza', 4.7, 567, 'https://images.unsplash.com/photo-1512496015851-a5fb722e002b?w=800', ARRAY['https://images.unsplash.com/photo-1512496015851-a5fb722e002b?w=800'], false, false, false, 80, 150, 'SB-PS-008'),
('Kit Tratamento Completo', 'Kit com sérum, creme diurno, creme noturno e máscara. Rotina completa de 30 dias, economia de 25%.', 2890.00, 3850.00, 'skincare', 'Suprema Beleza', 4.9, 178, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800', ARRAY['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800'], true, true, true, 90, 25, 'SB-KT-009'),
('Óleo Corporal Soberano', 'Óleo corporal com óleo de rosa mosqueta, jojoba e vitamina E. Hidratação profunda, brilho natural.', 580.00, 780.00, 'bodycare', 'Suprema Beleza', 4.6, 345, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70e0d2?w=800', ARRAY['https://images.unsplash.com/photo-1608248543803-ba4f8c70e0d2?w=800'], false, false, false, 88, 80, 'SB-OC-010');

-- ==================== SALONS - 5 SALÕES DE LUXO ====================
INSERT INTO salons (name, address, city, state, zip_code, phone, email, website, image, images, rating, reviews_count, is_verified, is_featured, latitude, longitude) VALUES
('Suprema Beleza - Jardins', 'Av. Paulista, 1578 - Jardins', 'São Paulo', 'SP', '01310-200', '(11) 3456-7890', 'jardins@supremabeleza.com.br', 'https://supremabeleza.com.br/jardins', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800', ARRAY['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'], 4.9, 234, true, true, -23.5614, -46.6565),
('Suprema Beleza - Ipanema', 'Rua Visconde de Pirajá, 550 - Ipanema', 'Rio de Janeiro', 'RJ', '22410-000', '(21) 3456-7891', 'ipanema@supremabeleza.com.br', 'https://supremabeleza.com.br/ipanema', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800', ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'], 4.8, 189, true, true, -22.9848, -43.1984),
('Suprema Beleza - Vila Madalena', 'Rua Harmonia, 123 - Vila Madalena', 'São Paulo', 'SP', '05435-000', '(11) 3456-7892', 'vilamadalena@supremabeleza.com.br', 'https://supremabeleza.com.br/vilamadalena', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800', ARRAY['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'], 4.7, 156, true, false, -23.5489, -46.6908),
('Suprema Beleza - Barra da Tijuca', 'Av. das Américas, 3500 - Barra da Tijuca', 'Rio de Janeiro', 'RJ', '22640-100', '(21) 3456-7893', 'barra@supremabeleza.com.br', 'https://supremabeleza.com.br/barra', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800', ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800'], 4.8, 201, true, false, -23.0065, -43.3656),
('Suprema Beleza - Moema', 'Av. Ibirapuera, 3100 - Moema', 'São Paulo', 'SP', '04029-200', '(11) 3456-7894', 'moema@supremabeleza.com.br', 'https://supremabeleza.com.br/moema', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800', ARRAY['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'], 4.6, 134, true, false, -23.6065, -46.6654);

-- ==================== PROFESSIONALS - 3 PROFISSIONAIS PREMIUM ====================
-- Primeiro, precisamos obter os IDs dos salões inseridos
-- Vamos usar subqueries para associar profissionais aos salões

INSERT INTO professionals (salon_id, name, role, bio, avatar, rating, reviews_count, specialties, experience_years, is_verified)
SELECT 
  s.id,
  'Isabella Soberano',
  'Diretora Artística',
  'Especialista em colorimetria avançada e técnicas de corte europeias. Mais de 15 anos transformando cabelos.',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  4.9,
  156,
  ARRAY['Coloração', 'Corte', 'Tratamentos'],
  15,
  true
FROM salons s WHERE s.name = 'Suprema Beleza - Jardins'
LIMIT 1;

INSERT INTO professionals (salon_id, name, role, bio, avatar, rating, reviews_count, specialties, experience_years, is_verified)
SELECT 
  s.id,
  'Rafaela Obsidiana',
  'Especialista em Skincare',
  'Esteticista certificada, especialista em tratamentos faciais de luxo e protocolos anti-aging.',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  4.8,
  203,
  ARRAY['Facial', 'Anti-aging', 'Limpeza de Pele'],
  12,
  true
FROM salons s WHERE s.name = 'Suprema Beleza - Ipanema'
LIMIT 1;

INSERT INTO professionals (salon_id, name, role, bio, avatar, rating, reviews_count, specialties, experience_years, is_verified)
SELECT 
  s.id,
  'Mariana Ouro',
  'Maquiadora Profissional',
  'Maquiadora certificada, especialista em maquiagem artística e eventos. Trabalhou em desfiles e editoriais.',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  4.9,
  178,
  ARRAY['Maquiagem Artística', 'Noivas', 'Editorial'],
  10,
  true
FROM salons s WHERE s.name = 'Suprema Beleza - Vila Madalena'
LIMIT 1;

-- ==================== SERVICES - 5 SERVIÇOS PREMIUM ====================
-- Associar serviços aos profissionais e salões

INSERT INTO services (professional_id, salon_id, name, description, price, duration, duration_minutes, category, is_available)
SELECT 
  p.id,
  p.salon_id,
  'Tratamento Facial Ouro 24K',
  'Tratamento facial completo com máscara de ouro 24K, limpeza profunda e hidratação intensa.',
  890.00,
  '90 minutos',
  90,
  'Facial',
  true
FROM professionals p WHERE p.name = 'Rafaela Obsidiana'
LIMIT 1;

INSERT INTO services (professional_id, salon_id, name, description, price, duration, duration_minutes, category, is_available)
SELECT 
  p.id,
  p.salon_id,
  'Coloração Soberana',
  'Coloração premium com produtos importados, técnicas de balayage e tratamento reparador.',
  650.00,
  '120 minutos',
  120,
  'Coloração',
  true
FROM professionals p WHERE p.name = 'Isabella Soberano'
LIMIT 1;

INSERT INTO services (professional_id, salon_id, name, description, price, duration, duration_minutes, category, is_available)
SELECT 
  p.id,
  p.salon_id,
  'Maquiagem Completa Premium',
  'Maquiagem profissional para eventos, com produtos de luxo e fixação de longa duração.',
  450.00,
  '60 minutos',
  60,
  'Maquiagem',
  true
FROM professionals p WHERE p.name = 'Mariana Ouro'
LIMIT 1;

INSERT INTO services (professional_id, salon_id, name, description, price, duration, duration_minutes, category, is_available)
SELECT 
  p.id,
  p.salon_id,
  'Corte e Escova Premium',
  'Corte personalizado seguido de escova profissional com produtos premium.',
  280.00,
  '75 minutos',
  75,
  'Corte',
  true
FROM professionals p WHERE p.name = 'Isabella Soberano'
LIMIT 1;

INSERT INTO services (professional_id, salon_id, name, description, price, duration, duration_minutes, category, is_available)
SELECT 
  p.id,
  p.salon_id,
  'Limpeza de Pele Profunda',
  'Limpeza de pele com extração, máscara e hidratação. Ideal para peles oleosas e com acne.',
  520.00,
  '80 minutos',
  80,
  'Facial',
  true
FROM professionals p WHERE p.name = 'Rafaela Obsidiana'
LIMIT 1;

-- ==================== SUBSCRIPTION BOXES - 3 CAIXAS PREMIUM ====================
-- Primeiro, vamos obter alguns IDs de produtos para as caixas
INSERT INTO subscription_boxes (tier, name, description, price, products, image, is_active)
SELECT 
  'premium',
  'Caixa Soberana Mensal',
  'Seleção mensal com 5 produtos premium de skincare e maquiagem. Valor total de R$ 2.500,00 por apenas R$ 1.890,00.',
  1890.00,
  ARRAY[
    (SELECT id FROM products WHERE sku = 'SB-VC-001'),
    (SELECT id FROM products WHERE sku = 'SB-CN-002'),
    (SELECT id FROM products WHERE sku = 'SB-MO-003'),
    (SELECT id FROM products WHERE sku = 'SB-BL-007'),
    (SELECT id FROM products WHERE sku = 'SB-OC-010')
  ],
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
  true;

INSERT INTO subscription_boxes (tier, name, description, price, products, image, is_active)
SELECT 
  'luxury',
  'Caixa Obsidiana Trimestral',
  'Caixa trimestral com 8 produtos de luxo, incluindo itens exclusivos e edições limitadas. Valor total de R$ 5.800,00 por apenas R$ 4.290,00.',
  4290.00,
  ARRAY[
    (SELECT id FROM products WHERE sku = 'SB-VC-001'),
    (SELECT id FROM products WHERE sku = 'SB-CN-002'),
    (SELECT id FROM products WHERE sku = 'SB-MO-003'),
    (SELECT id FROM products WHERE sku = 'SB-PO-006'),
    (SELECT id FROM products WHERE sku = 'SB-KT-009'),
    (SELECT id FROM products WHERE sku = 'SB-SR-004'),
    (SELECT id FROM products WHERE sku = 'SB-CH-005'),
    (SELECT id FROM products WHERE sku = 'SB-OC-010')
  ],
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
  true;

INSERT INTO subscription_boxes (tier, name, description, price, products, image, is_active)
SELECT 
  'elite',
  'Caixa Suprema Anual',
  'Caixa anual com 12 produtos premium, acesso exclusivo a lançamentos e desconto de 30% em todos os serviços.',
  8990.00,
  ARRAY[
    (SELECT id FROM products WHERE sku = 'SB-VC-001'),
    (SELECT id FROM products WHERE sku = 'SB-CN-002'),
    (SELECT id FROM products WHERE sku = 'SB-MO-003'),
    (SELECT id FROM products WHERE sku = 'SB-PO-006'),
    (SELECT id FROM products WHERE sku = 'SB-KT-009'),
    (SELECT id FROM products WHERE sku = 'SB-SR-004'),
    (SELECT id FROM products WHERE sku = 'SB-CH-005'),
    (SELECT id FROM products WHERE sku = 'SB-OC-010'),
    (SELECT id FROM products WHERE sku = 'SB-BL-007'),
    (SELECT id FROM products WHERE sku = 'SB-PS-008')
  ],
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
  true;

-- ==================== VERIFICATION QUERIES ====================
-- Execute estas queries após inserir os dados para verificar:

-- SELECT COUNT(*) as total_products FROM products;
-- SELECT COUNT(*) as total_salons FROM salons;
-- SELECT COUNT(*) as total_professionals FROM professionals;
-- SELECT COUNT(*) as total_services FROM services;
-- SELECT COUNT(*) as total_subscription_boxes FROM subscription_boxes;

-- SELECT name, price, category FROM products ORDER BY created_at DESC LIMIT 10;
-- SELECT name, city, rating FROM salons ORDER BY rating DESC;
-- SELECT p.name, s.name as salon_name FROM professionals p JOIN salons s ON p.salon_id = s.id;

