// src/pages/ProductDetailPage.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import ProductTryOn from '@/components/ProductTryOn';
import { useProduct } from '@/hooks/useProduct';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Sparkles, Loader2 } from 'lucide-react';

interface ProductDetailPageProps {
  productId?: string;
  onBack?: () => void;
}

export default function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const navigate = useNavigate();
  const params = useParams<{ productId?: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showTryOn, setShowTryOn] = useState(false);

  const resolvedProductId = params.productId || productId || '';

  // Fetch product from Supabase
  const { product, loading, error } = useProduct(resolvedProductId);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted">Carregando produto...</span>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-error mb-4">{error || 'Produto não encontrado'}</p>
        <Button onClick={() => navigate('/shop')}>Voltar para a loja</Button>
      </div>
    );
  }

  // Transform product data for component
  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.original_price,
    rating: product.rating || 0,
    reviews: product.reviews_count || 0,
    inStock: product.in_stock !== false,
    category: product.category,
    brand: product.brand || 'Alsham',
    description: product.description || '',
    benefits: [
      'Produto premium selecionado',
      'Qualidade garantida Alsham',
      'Entrega rápida e segura',
    ],
    ingredients: 'Ingredientes disponíveis na embalagem',
    howToUse: 'Siga as instruções na embalagem do produto',
    images: product.images && product.images.length > 0 ? product.images : 
            product.image ? [product.image] : [
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80'
    ],
    tags: product.is_best_seller ? ['Bestseller'] : product.is_new ? ['Novo'] : []
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: productData.images[0] || product.image || ''
    });
    toast({
      title: '✅ Adicionado ao carrinho!',
      description: `${quantity}x ${product.name}`,
    });
  };

  const handleTryOn = () => {
    setShowTryOn(true);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <button onClick={handleBack} className="hover:text-gold transition-colors">Home</button>
          <span>/</span>
          <button onClick={handleBack} className="hover:text-gold transition-colors">Shop</button>
          <span>/</span>
          <span className="text-foreground">{productData.category}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <Card className="bg-surface border-primary/30 p-4 mb-4 overflow-hidden">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              {productData.tags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {productData.tags.map((tag, idx) => (
                    <Badge key={idx} variant="gold">{tag}</Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {productData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img src={img} alt={`${productData.name} ${idx + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>

            {/* AR Try-On Button */}
            <Button
              onClick={handleTryOn}
              className="w-full mt-6 bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary-hover text-foreground-inverse font-bold text-lg py-6"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Experimentar com AR/VR
            </Button>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-gold text-sm font-bold uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{productData.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-foreground font-bold">{productData.rating}</span>
                <span className="text-muted">({productData.reviews.toLocaleString()} avaliações)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold text-primary">R$ {productData.price.toFixed(2)}</span>
                {productData.oldPrice && (
                  <span className="text-2xl text-muted line-through">R$ {productData.oldPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Stock Status */}
              {productData.inStock ? (
                <Badge variant="success" className="mb-6">✅ Em estoque - Envio imediato</Badge>
              ) : (
                <Badge variant="error" className="mb-6">❌ Fora de estoque</Badge>
              )}
            </div>

            {/* Description */}
            <Card className="bg-surface border-border p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Sobre o Produto</h3>
              <p className="text-foreground-secondary leading-relaxed">{productData.description}</p>
            </Card>

            {/* Benefits */}
            <Card className="bg-surface border-border p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Benefícios</h3>
              <ul className="space-y-3">
                {productData.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-foreground-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-muted">Quantidade:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-surface border border-border hover:border-primary transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-surface border border-border hover:border-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!productData.inStock}
                className="flex-1 bg-primary hover:bg-primary-hover text-foreground-inverse font-bold text-xl py-6"
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-foreground-inverse p-6">
                <Heart className="w-6 h-6" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-foreground-inverse p-6">
                <Share2 className="w-6 h-6" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-surface border-border p-4 flex items-center gap-3">
                <Truck className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-sm">Frete Grátis</p>
                  <p className="text-xs text-muted">Acima de R$ 150</p>
                </div>
              </Card>
              <Card className="bg-surface border-border p-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-sm">Garantia 30 dias</p>
                  <p className="text-xs text-muted">Devolução grátis</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <div className="mt-16">
          <Card className="bg-surface border-border p-8">
            <h3 className="text-2xl font-bold mb-6">Informações Adicionais</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-primary font-bold mb-2">Como Usar</h4>
                <p className="text-foreground-secondary">{productData.howToUse}</p>
              </div>

              <div>
                <h4 className="text-primary font-bold mb-2">Ingredientes</h4>
                <p className="text-foreground-secondary text-sm">{productData.ingredients}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* AR Try-On Modal */}
      {showTryOn && (
        <ProductTryOn
          productName={productData.name}
          productImage={product.images[0]}
          onClose={() => setShowTryOn(false)}
        />
      )}
    </div>
  );
}
