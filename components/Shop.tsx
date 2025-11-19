
import React, { useState } from 'react';
import { ShopProduct, ShopCategory } from '../types';

// --- MOCK DATA: EMPÓRIO ALSHAM (IMAGENS REVISADAS & ESTÁVEIS) ---
const products: ShopProduct[] = [
    // --- PERFUMARIA (IMPORTADOS) ---
    {
        id: 'p1', name: 'L\'Homme Mystère Eau de Parfum', description: 'Notas de Oud, Couro e Tabaco. Intensidade extrema.', price: 890.00, originalPrice: 1200.00,
        category: 'Perfumaria', rating: 5.0, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1594035910387-40f78ee6604a?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p2', name: 'Royal Gold Essence', description: 'Fragrância oriental com toques de açafrão e rosa negra.', price: 1450.00,
        category: 'Perfumaria', rating: 4.9, isNew: true,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p3', name: 'Oceanic Blue Intense', description: 'Fresco, cítrico e amadeirado. Inspirado no Mediterrâneo.', price: 650.00,
        category: 'Perfumaria', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1523293188086-b469999ada95?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p4', name: 'Velvet Rose & Oud', description: 'Luxo engarrafado. Doce, defumado e profundamente sedutor.', price: 980.00,
        category: 'Perfumaria', rating: 5.0,
        image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p5', name: 'Noir Extreme', description: 'Para a noite. Âmbar, especiarias e baunilha negra.', price: 720.00,
        category: 'Perfumaria', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1615160944783-0e5ce6881281?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p6', name: 'White Floral Absolute', description: 'Jasmim, Tuberosa e Sândalo. Feminilidade pura.', price: 590.00,
        category: 'Perfumaria', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1585386959960-834228997a5d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p7', name: 'Citrus Neroli Portofino', description: 'A brisa italiana em um frasco. Refrescante e chique.', price: 850.00,
        category: 'Perfumaria', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1595425970339-8d70690961c4?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p8', name: 'Santal 33 Signature', description: 'O cheiro do sucesso. Sândalo, Papiro e Cardamomo.', price: 1100.00,
        category: 'Perfumaria', rating: 5.0, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p9', name: 'Tobacco Vanille Royale', description: 'Tabaco opulento e baunilha cremosa. Unisex.', price: 1250.00,
        category: 'Perfumaria', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1541108564883-b6848dc33583?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'p10', name: 'Rouge 540 Extract', description: 'Açafrão, Âmbar Gris e Cedro. O perfume mais desejado.', price: 2200.00,
        category: 'Perfumaria', rating: 5.0, isNew: true,
        image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=800&q=80'
    },

    // --- CABELO ---
    {
        id: 'c1', name: 'Kit L\'Oréal Metal Detox', description: 'Neutralizador de metal para cor vibrante e sem quebra.', price: 389.90, originalPrice: 450.00,
        category: 'Cabelo', rating: 4.9, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c2', name: 'Kérastase Elixir Ultime', description: 'Oleo capilar nutritivo para brilho intenso e antifrizz.', price: 299.90,
        category: 'Cabelo', rating: 5.0,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c3', name: 'Máscara Cronograma Capilar', description: 'Reconstrução potente com queratina hidrolisada.', price: 159.90,
        category: 'Cabelo', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c4', name: 'Shampoo Violeta Matizador', description: 'Remove tons amarelados de loiros e grisalhos.', price: 89.90,
        category: 'Cabelo', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c5', name: 'Spray Texturizador Salino', description: 'Efeito "Beach Waves" natural e volume instantâneo.', price: 120.00,
        category: 'Cabelo', rating: 4.5,
        image: 'https://images.unsplash.com/photo-1624638764752-032c147d3595?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c6', name: 'Tônico de Crescimento 5%', description: 'Estimula folículos para cabelos mais densos.', price: 180.00,
        category: 'Cabelo', rating: 4.9, isNew: true,
        image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c7', name: 'Escova Secadora Titanium', description: 'Seca, alisa e modela com íons negativos.', price: 450.00,
        category: 'Cabelo', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c8', name: 'Modelador de Cachos 32mm', description: 'Cachos largos e duradouros com cerâmica.', price: 320.00,
        category: 'Cabelo', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c9', name: 'Sérum Noturno Nutritive', description: 'Nutrição intensa enquanto você dorme.', price: 280.00,
        category: 'Cabelo', rating: 5.0,
        image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'c10', name: 'Kit Olaplex Full Treatment', description: 'O padrão ouro para reparação de danos.', price: 1100.00,
        category: 'Cabelo', rating: 5.0, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1600609842388-3e2641d7dc29?auto=format&fit=crop&w=800&q=80'
    },

    // --- SKINCARE ---
    {
        id: 's1', name: 'Sérum Vitamina C 10 Pure', description: 'Antioxidante potente para luminosidade e correção.', price: 189.90,
        category: 'Skincare', rating: 4.8, isNew: true,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's2', name: 'Ácido Hialurônico + B5', description: 'Hidratação profunda e preenchimento de linhas finas.', price: 150.00,
        category: 'Skincare', rating: 4.9, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's3', name: 'Retinol Night Concentrate', description: 'Renovação celular anti-idade noturna.', price: 220.00,
        category: 'Skincare', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's4', name: 'Protetor Solar FPS 70 Toque Seco', description: 'Proteção máxima sem oleosidade. Com cor.', price: 89.90,
        category: 'Skincare', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's5', name: 'Cleansing Oil Japonês', description: 'Remove maquiagem à prova d\'água sem agredir.', price: 110.00,
        category: 'Skincare', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1556228720-19de77d6022a?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's6', name: 'Tônico Ácido Glicólico 7%', description: 'Esfoliação química suave para pele radiante.', price: 95.00,
        category: 'Skincare', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's7', name: 'Creme para Olhos Cafeína', description: 'Reduz olheiras e inchaço matinal.', price: 75.00,
        category: 'Skincare', rating: 4.5,
        image: 'https://images.unsplash.com/photo-1571781926291-280553d400f4?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's8', name: 'Kit Spa Facial Completo', description: 'Máscaras de argila, sérum e rolo de jade.', price: 350.00,
        category: 'Skincare', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's9', name: 'Bruma Hidratante Facial', description: 'Refresca e fixa a maquiagem.', price: 60.00,
        category: 'Skincare', rating: 4.4,
        image: 'https://images.unsplash.com/photo-1629198710043-e948e9454822?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 's10', name: 'Hidratante Gel Water Cream', description: 'Textura leve para peles oleosas.', price: 140.00,
        category: 'Skincare', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80'
    },

    // --- WELLNESS (NUTRIÇÃO) ---
    {
        id: 'w1', name: 'Matcha Ceremonial Orgânico', description: 'Chá verde japonês premium. Energia zen.', price: 120.00, originalPrice: 150.00,
        category: 'Wellness', rating: 5.0, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w2', name: 'Gummy Hair Vitamins', description: 'Biotina e Zinco para cabelos e unhas fortes.', price: 149.90,
        category: 'Wellness', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w3', name: 'Colágeno Hidrolisado Verisol', description: 'Firmeza da pele e redução de rugas comprovada.', price: 199.90,
        category: 'Wellness', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1550572017-4fcd95e51735?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w4', name: 'Sleep Melatonin Drops', description: 'Gotas para indução de sono profundo e reparador.', price: 85.00,
        category: 'Wellness', rating: 4.8, isNew: true,
        image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w5', name: 'Chá Detox 30 Dias', description: 'Blend de ervas para desinchar e acelerar metabolismo.', price: 69.90,
        category: 'Wellness', rating: 4.5,
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w6', name: 'Probióticos Daily Balance', description: 'Saúde intestinal para uma pele mais limpa.', price: 130.00,
        category: 'Wellness', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1593037515494-3b53617c1820?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w7', name: 'Óleo Essencial de Lavanda', description: 'Aromaterapia para redução de estresse.', price: 45.00,
        category: 'Wellness', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w8', name: 'Garrafa Térmica Inteligente', description: 'Mantém temperatura e lembra de beber água.', price: 180.00,
        category: 'Wellness', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1602143407151-cd11120bc06e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w9', name: 'Supercoffee Energy', description: 'Café com TCM e Taurina para foco mental.', price: 110.00,
        category: 'Wellness', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1587049633312-d64c32a13f3c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'w10', name: 'Vitamina D3 + K2', description: 'Imunidade e saúde óssea.', price: 60.00,
        category: 'Wellness', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },

    // --- HOMEM ---
    {
        id: 'h1', name: 'Beard Growth Kit Full', description: 'Roller, Sérum Ativador e Pente de Madeira.', price: 210.00,
        category: 'Homem', rating: 4.8, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h2', name: 'Pomada Efeito Matte', description: 'Fixação forte sem brilho. Acabamento natural.', price: 65.00,
        category: 'Homem', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h3', name: 'Shampoo 3 em 1 Premium', description: 'Cabelo, Barba e Corpo. Praticidade com qualidade.', price: 55.00,
        category: 'Homem', rating: 4.5,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h4', name: 'Óleo para Barba Oud Wood', description: 'Hidratação com fragrância amadeirada nobre.', price: 90.00,
        category: 'Homem', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1626309026921-3c35887b4429?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h5', name: 'Lâmina de Barbear Clássica', description: 'Safety Razor de metal para barbear tradicional.', price: 150.00,
        category: 'Homem', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1626309402897-a245a19a42c1?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h6', name: 'Pós-Barba Balsâmico', description: 'Acalma a pele e evita irritação. Sem álcool.', price: 70.00,
        category: 'Homem', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h7', name: 'Esfoliante Facial Carvão', description: 'Remove impurezas profundas e controla oleosidade.', price: 60.00,
        category: 'Homem', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1571781926291-280553d400f4?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h8', name: 'Gel de Modelagem Black', description: 'Disfarça grisalhos e fixa o penteado.', price: 50.00,
        category: 'Homem', rating: 4.4,
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h9', name: 'Máquina de Acabamento Pro', description: 'Lâmina T para detalhes e contornos precisos.', price: 380.00,
        category: 'Homem', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'h10', name: 'Hidratante Anti-Fadiga', description: 'Combate sinais de cansaço e inchaço.', price: 110.00,
        category: 'Homem', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    },

    // --- FITNESS ---
    {
        id: 'f1', name: 'Gel Redutor Termogênico', description: 'Acelera queima de gordura abdominal localizada.', price: 89.90, originalPrice: 120.00,
        category: 'Fitness', rating: 4.6, isBestSeller: true,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f2', name: 'Creatina Monohidratada Pura', description: 'Força e explosão muscular.', price: 130.00,
        category: 'Fitness', rating: 5.0,
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f3', name: 'Whey Protein Isolado Baunilha', description: 'Proteína de alta absorção com sabor gourmet.', price: 250.00,
        category: 'Fitness', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f4', name: 'Pré-Treino Insane Focus', description: 'Energia extrema para treinos intensos.', price: 160.00,
        category: 'Fitness', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f5', name: 'Creme Anticelulite Cafeína', description: 'Melhora a textura da pele e firmeza.', price: 95.00,
        category: 'Fitness', rating: 4.5,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f6', name: 'Faixa Elástica de Resistência', description: 'Kit com 3 intensidades para treino em casa.', price: 70.00,
        category: 'Fitness', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f7', name: 'Garrafa Shaker Pro', description: 'Com compartimento para pó e cápsulas.', price: 40.00,
        category: 'Fitness', rating: 4.6,
        image: 'https://images.unsplash.com/photo-1602143407151-cd11120bc06e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f8', name: 'Barra de Proteína Box (12un)', description: 'Sabor Chocolate Belga. 20g de proteína.', price: 180.00,
        category: 'Fitness', rating: 4.8,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f9', name: 'Relógio Monitor Cardíaco', description: 'Controle seus batimentos e calorias.', price: 350.00,
        category: 'Fitness', rating: 4.7,
        image: 'https://images.unsplash.com/photo-1557935728-90d895715233?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'f10', name: 'Tapete de Yoga Premium', description: 'Antiderrapante e extra espesso.', price: 120.00,
        category: 'Fitness', rating: 4.9,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a9?auto=format&fit=crop&w=800&q=80'
    }
];

const categories: ShopCategory[] = ['Todos', 'Perfumaria', 'Cabelo', 'Skincare', 'Wellness', 'Homem', 'Fitness'];

const Shop: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ShopCategory>('Todos');
    const [cartCount, setCartCount] = useState(0);

    const filteredProducts = activeCategory === 'Todos' 
        ? products 
        : products.filter(p => p.category === activeCategory);

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
        alert("Produto adicionado à Sacola Alsham!");
    };

    return (
        <div style={{ padding: '0 0 60px 0' }}>
            
            {/* HEADER FLUTUANTE DO SHOP */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                padding: '20px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div>
                     <h2 style={{ color: '#F0F0F0', margin: 0, fontSize: '2em', fontFamily: 'Cinzel, serif' }}>ALSHAM BOUTIQUE</h2>
                     <p style={{ color: '#D4AF37', margin: 0, fontSize: '0.8em', letterSpacing: '2px', textTransform: 'uppercase' }}>Curadoria de Luxo & Bem-Estar</p>
                </div>
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <span style={{ fontSize: '1.5em' }}>🛍️</span>
                    {cartCount > 0 && (
                        <span style={{ 
                            position: 'absolute', top: '-5px', right: '-10px', 
                            background: '#D4AF37', color: '#000', 
                            borderRadius: '50%', width: '20px', height: '20px', 
                            fontSize: '0.7em', fontWeight: 'bold', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center' 
                        }}>
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>

            {/* HERO BANNER ROTATIVO (SIMPLIFICADO) */}
            <div style={{ 
                height: '400px', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                position: 'relative', 
                marginBottom: '40px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
                <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=2000&q=80" alt="Luxury Perfume" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)' }}></div>
                <div style={{ position: 'absolute', bottom: '60px', left: '60px', maxWidth: '500px' }}>
                    <span style={{ background: '#D4AF37', color: '#000', padding: '5px 10px', fontSize: '0.7em', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Lançamento Exclusivo</span>
                    <h2 style={{ color: '#FFF', fontFamily: 'Cinzel, serif', fontSize: '3.5em', margin: '15px 0', lineHeight: '1' }}>ESSÊNCIA<br/>SUPREMA</h2>
                    <p style={{ color: '#E0E0E0', marginBottom: '30px', fontFamily: 'Montserrat, sans-serif', fontSize: '1.1em', fontWeight: 300 }}>
                        A nova coleção de perfumaria de nicho importada. Fragrâncias que marcam presença antes mesmo de você chegar.
                    </p>
                    <button style={{ padding: '15px 35px', background: '#FFF', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', borderRadius: '2px' }}>Explorar Perfumes</button>
                </div>
            </div>

            {/* CATEGORY TABS */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '20px' }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '12px 30px',
                            borderRadius: '30px',
                            background: activeCategory === cat ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                            color: activeCategory === cat ? '#000' : '#A0A0A0',
                            border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontWeight: activeCategory === cat ? 'bold' : 'normal',
                            fontSize: '0.9em',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* PRODUCT GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                {filteredProducts.map(product => (
                    <div key={product.id} style={{ 
                        background: '#121212', 
                        borderRadius: '12px', 
                        border: '1px solid #222', 
                        overflow: 'hidden',
                        transition: 'transform 0.3s',
                        position: 'relative',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {/* Badges */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {product.isBestSeller && <span style={{ background: '#000', color: '#D4AF37', border: '1px solid #D4AF37', fontSize: '0.6em', padding: '3px 8px', textTransform: 'uppercase', fontWeight: 'bold', borderRadius: '2px' }}>Best Seller</span>}
                            {product.isNew && <span style={{ background: '#FFF', color: '#000', fontSize: '0.6em', padding: '3px 8px', textTransform: 'uppercase', fontWeight: 'bold', borderRadius: '2px' }}>Novo</span>}
                            {product.originalPrice && <span style={{ background: '#D00', color: '#FFF', fontSize: '0.6em', padding: '3px 8px', textTransform: 'uppercase', fontWeight: 'bold', borderRadius: '2px' }}>-{Math.round(((product.originalPrice - product.price)/product.originalPrice)*100)}%</span>}
                        </div>

                        <div style={{ height: '250px', overflow: 'hidden', background: '#000' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                        </div>

                        <div style={{ padding: '20px' }}>
                            <div style={{ color: '#888', fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{product.category}</div>
                            <h3 style={{ color: '#F0F0F0', fontSize: '1em', margin: '0 0 10px 0', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.name}</h3>
                            <p style={{ color: '#666', fontSize: '0.8em', marginBottom: '15px', height: '35px', overflow: 'hidden' }}>{product.description}</p>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '15px' }}>
                                <span style={{ color: '#D4AF37', fontSize: '1.2em', fontWeight: 'bold' }}>R$ {product.price.toFixed(2)}</span>
                                {product.originalPrice && <span style={{ color: '#666', fontSize: '0.9em', textDecoration: 'line-through' }}>R$ {product.originalPrice.toFixed(2)}</span>}
                            </div>

                            <button 
                                onClick={handleAddToCart}
                                style={{ 
                                    width: '100%', 
                                    padding: '12px', 
                                    background: 'transparent', 
                                    border: '1px solid #D4AF37', 
                                    color: '#D4AF37', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer', 
                                    textTransform: 'uppercase', 
                                    fontSize: '0.8em', 
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s' 
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#D4AF37';
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#D4AF37';
                                }}
                            >
                                Adicionar à Sacola
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
