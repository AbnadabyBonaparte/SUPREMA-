// src/pages/ShopPage.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShopProduct, ShopCategory } from '@/types/ai';

// Mock products data (from legacy)
const products: ShopProduct[] = [
    // Perfumaria
    { id: 'p1', name: 'L\'Homme Mystère Eau de Parfum', description: 'Notas de Oud, Couro e Tabaco. Intensidade extrema.', price: 890.00, originalPrice: 1200.00, category: 'Perfumaria', rating: 5.0, isBestSeller: true, image: 'https://images.unsplash.com/photo-1594035910387-40f78ee6604a?auto=format&fit=crop&w=800&q=80' },
    { id: 'p2', name: 'Royal Gold Essence', description: 'Fragrância oriental com toques de açafrão e rosa negra.', price: 1450.00, category: 'Perfumaria', rating: 4.9, isNew: true, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80' },
    { id: 'p3', name: 'Oceanic Blue Intense', description: 'Fresco, cítrico e amadeirado. Inspirado no Mediterrâneo.', price: 650.00, category: 'Perfumaria', rating: 4.8, image: 'https://images.unsplash.com/photo-1523293188086-b469999ada95?auto=format&fit=crop&w=800&q=80' },

    // Cabelo
    { id: 'c1', name: 'Kit L\'Oréal Metal Detox', description: 'Neutralizador de metal para cor vibrante e sem quebra.', price: 389.90, originalPrice: 450.00, category: 'Cabelo', rating: 4.9, isBestSeller: true, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80' },
    { id: 'c2', name: 'Kérastase Elixir Ultime', description: 'Oleo capilar nutritivo para brilho intenso e antifrizz.', price: 299.90, category: 'Cabelo', rating: 5.0, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80' },

    // Skincare
    { id: 's1', name: 'Sérum Vitamina C 10 Pure', description: 'Antioxidante potente para luminosidade e correção.', price: 189.90, category: 'Skincare', rating: 4.8, isNew: true, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80' },
    { id: 's2', name: 'Ácido Hialurônico + B5', description: 'Hidratação profunda e preenchimento de linhas finas.', price: 150.00, category: 'Skincare', rating: 4.9, isBestSeller: true, image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80' },

    // Wellness
    { id: 'w1', name: 'Matcha Ceremonial Orgânico', description: 'Chá verde japonês premium. Energia zen.', price: 120.00, originalPrice: 150.00, category: 'Wellness', rating: 5.0, isBestSeller: true, image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=800&q=80' },
    { id: 'w2', name: 'Gummy Hair Vitamins', description: 'Biotina e Zinco para cabelos e unhas fortes.', price: 149.90, category: 'Wellness', rating: 4.7, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80' },

    // Homem
    { id: 'h1', name: 'Beard Growth Kit Full', description: 'Roller, Sérum Ativador e Pente de Madeira.', price: 210.00, category: 'Homem', rating: 4.8, isBestSeller: true, image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80' },
    { id: 'h2', name: 'Pomada Efeito Matte', description: 'Fixação forte sem brilho. Acabamento natural.', price: 65.00, category: 'Homem', rating: 4.7, image: 'https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=800&q=80' },

    // Fitness
    { id: 'f1', name: 'Gel Redutor Termogênico', description: 'Acelera queima de gordura abdominal localizada.', price: 89.90, originalPrice: 120.00, category: 'Fitness', rating: 4.6, isBestSeller: true, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80' },
    { id: 'f2', name: 'Creatina Monohidratada Pura', description: 'Força e explosão muscular.', price: 130.00, category: 'Fitness', rating: 5.0, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80' },
];

const categories: ShopCategory[] = ['Todos', 'Perfumaria', 'Cabelo', 'Skincare', 'Wellness', 'Homem', 'Fitness'];

export function ShopPage() {
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
        <div className="py-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-4xl font-serif text-foreground mb-1">ALSHAM BOUTIQUE</h2>
                    <p className="text-[#D4AF37] text-xs uppercase tracking-[2px]">Curadoria de Luxo & Bem-Estar</p>
                </div>
                <div className="relative cursor-pointer">
                    <span className="text-2xl">🛍️</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-black rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Hero Banner */}
            <div className="h-96 rounded-xl overflow-hidden relative mb-10 shadow-2xl border border-[#D4AF37]/30">
                <img
                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=2000&q=80"
                    alt="Luxury Perfume"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-16 left-16 max-w-lg">
                    <span className="bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">Lançamento Exclusivo</span>
                    <h2 className="text-white font-serif text-6xl mt-4 mb-4 leading-tight">ESSÊNCIA<br />SUPREMA</h2>
                    <p className="text-gray-200 mb-8 text-lg font-light">
                        A nova coleção de perfumaria de nicho importada. Fragrâncias que marcam presença antes mesmo de você chegar.
                    </p>
                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-wider">
                        Explorar Perfumes
                    </Button>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-3 overflow-x-auto pb-6 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-full whitespace-nowrap text-sm uppercase tracking-wider font-medium transition-all ${activeCategory === cat
                                ? 'bg-[#D4AF37] text-black'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-[#D4AF37]/50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <Card
                        key={product.id}
                        className="bg-[#121212] border-[#222] overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                    >
                        {/* Badges */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                            {product.isBestSeller && (
                                <span className="bg-black text-[#D4AF37] border border-[#D4AF37] text-[10px] px-2 py-1 uppercase font-bold rounded-sm">
                                    Best Seller
                                </span>
                            )}
                            {product.isNew && (
                                <span className="bg-white text-black text-[10px] px-2 py-1 uppercase font-bold rounded-sm">
                                    Novo
                                </span>
                            )}
                            {product.originalPrice && (
                                <span className="bg-red-600 text-white text-[10px] px-2 py-1 uppercase font-bold rounded-sm">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                            )}
                        </div>

                        {/* Image */}
                        <div className="h-64 overflow-hidden bg-black">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{product.category}</div>
                            <h3 className="text-foreground text-base font-medium mb-2 h-12 line-clamp-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">{product.description}</p>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-[#D4AF37] text-xl font-bold">R$ {product.price.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="text-gray-600 text-sm line-through">R$ {product.originalPrice.toFixed(2)}</span>
                                )}
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                variant="outline"
                                className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black uppercase text-xs font-bold"
                            >
                                Adicionar à Sacola
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default ShopPage;
