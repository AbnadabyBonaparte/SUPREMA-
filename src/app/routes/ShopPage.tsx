// src/pages/ShopPage.tsx
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShopCategory } from '@/types/ai';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';

const categories: ShopCategory[] = ['Todos', 'Perfumaria', 'Cabelo', 'Skincare', 'Wellness', 'Homem', 'Fitness'];

export function ShopPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState<ShopCategory>('Todos');
    const [cartCount, setCartCount] = useState(0);

    // Fetch products from Supabase
    const { products, loading, error } = useProducts(activeCategory === 'Todos' ? undefined : activeCategory);

    // Transform products to match ShopProduct interface
    const transformedProducts = useMemo(() => {
        return products.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description || '',
            price: p.price,
            originalPrice: p.original_price,
            category: p.category,
            rating: p.rating || 0,
            isBestSeller: p.is_best_seller || false,
            isNew: p.is_new || false,
            image: p.image || p.images?.[0] || '',
        }));
    }, [products]);

    const handleAddToCart = () => {
        setCartCount(prev => prev + 1);
        alert("Produto adicionado à Sacola Alsham!");
    };

    const handleViewDetails = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="py-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                <div>
                    <h2 className="text-4xl font-serif text-foreground mb-1">ALSHAM BOUTIQUE</h2>
                    <p className="text-primary text-xs uppercase tracking-[2px]">Curadoria de Luxo & Bem-Estar</p>
                </div>
                <div className="relative cursor-pointer">
                    <span className="text-2xl">🛍️</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-primary text-foreground-inverse rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Hero Banner */}
            <div className="h-96 rounded-xl overflow-hidden relative mb-10 shadow-2xl border border-primary/30">
                <img
                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=2000&q=80"
                    alt="Luxury Perfume"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-16 left-16 max-w-lg">
                    <span className="bg-primary text-foreground-inverse px-3 py-1 text-xs font-bold uppercase tracking-wider">Lançamento Exclusivo</span>
                    <h2 className="text-foreground font-serif text-6xl mt-4 mb-4 leading-tight">ESSÊNCIA<br />SUPREMA</h2>
                    <p className="text-foreground-secondary mb-8 text-lg font-light">
                        A nova coleção de perfumaria de nicho importada. Fragrâncias que marcam presença antes mesmo de você chegar.
                    </p>
                    <Button size="lg" className="bg-surface text-foreground-inverse hover:bg-surface-hover font-bold uppercase tracking-wider">
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
                                ? 'bg-primary text-foreground-inverse'
                                : 'bg-surface/5 text-muted border border-border hover:border-primary/50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted">Carregando produtos...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-20">
                    <p className="text-error mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && transformedProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted text-lg mb-4">Nenhum produto encontrado</p>
                    <p className="text-muted text-sm">Tente selecionar outra categoria</p>
                </div>
            )}

            {/* Product Grid */}
            {!loading && !error && transformedProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {transformedProducts.map(product => (
                    <Card
                        key={product.id}
                        className="bg-surface border-border overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                    >
                        {/* Badges */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                            {product.isBestSeller && (
                                <span className="bg-background text-primary border border-primary text-[10px] px-2 py-1 uppercase font-bold rounded-sm">
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
                            <div className="text-muted text-xs uppercase tracking-wider mb-1">{product.category}</div>
                            <h3 className="text-foreground text-base font-medium mb-2 h-12 line-clamp-2">{product.name}</h3>
                            <p className="text-muted text-sm mb-4 h-10 line-clamp-2">{product.description}</p>

                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-primary text-xl font-bold">R$ {product.price.toFixed(2)}</span>
                                {product.originalPrice && (
                                    <span className="text-muted text-sm line-through">R$ {product.originalPrice.toFixed(2)}</span>
                                )}
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                variant="outline"
                                className="w-full border-primary text-primary hover:bg-primary hover:text-foreground-inverse uppercase text-xs font-bold"
                            >
                                Adicionar à Sacola
                            </Button>
                            <Button
                                onClick={() => handleViewDetails(product.id)}
                                variant="ghost"
                                className="w-full mt-3 text-primary hover:text-foreground-inverse hover:bg-primary uppercase text-xs font-bold"
                            >
                                Ver detalhes
                            </Button>
                        </div>
                    </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
export default ShopPage;
