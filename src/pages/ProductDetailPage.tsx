// src/pages/ProductDetailPage.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import ProductTryOn from '@/components/ProductTryOn';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Sparkles } from 'lucide-react';

interface ProductDetailPageProps {
  productId?: string;
  onBack?: () => void;
}

export default function ProductDetailPage({ productId = '1', onBack }: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showTryOn, setShowTryOn] = useState(false);

  // Mock product data
  const product = {
    id: productId,
    name: 'Shampoo Metal Detox Alsham',
    price: 189.90,
    oldPrice: 249.90,
    rating: 4.9,
    reviews: 2847,
    inStock: true,
    category: 'Cabelo',
    brand: 'Alsham',
    description: 'Revolucione seu cabelo com a tecnologia Metal Detox. Remove metais pesados acumulados, restaura o brilho natural e protege contra danos futuros. Fórmula exclusiva com nanotecnologia e ingredientes sustentáveis.',
    benefits: [
      'Remove 100% dos metais pesados em 3 aplicações',
      'Restaura o brilho natural em 7 dias',
      'Protege contra poluição e água dura',
      'Fórmula vegana e cruelty-free',
      'Fragrância exclusiva Alsham Signature'
    ],
    ingredients: 'Aqua, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Glycerin, Citric Acid, Guar Hydroxypropyltrimonium Chloride, Parfum, Limonene',
    howToUse: 'Aplique no cabelo molhado, massageie suavemente o couro cabeludo por 2-3 minutos. Enxágue abundantemente. Para melhores resultados, use 3x por semana.',
    images: [
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Bestseller', 'Sustentável', 'Vegano']
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0]
    });
    toast({
      title: '✅ Adicionado ao carrinho!',
      description: `${quantity}x ${product.name}`,
    });
  };

  const handleTryOn = () => {
    setShowTryOn(true);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <button onClick={onBack} className="hover:text-gold transition-colors">Home</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-gold transition-colors">Shop</button>
          <span>/</span>
          <span className="text-white">{product.category}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <Card className="bg-[#1A1A1A] border-gold/30 p-4 mb-4 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              {product.tags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {product.tags.map((tag, idx) => (
                    <Badge key={idx} variant="gold">{tag}</Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-gold' : 'border-[#333] hover:border-gold/50'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>

            {/* AR Try-On Button */}
            <Button
              onClick={handleTryOn}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Experimentar com AR/VR
            </Button>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-gold text-sm font-bold uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-white font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviews.toLocaleString()} avaliações)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-bold text-gold">R$ {product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-2xl text-gray-500 line-through">R$ {product.oldPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Stock Status */}
              {product.inStock ? (
                <Badge variant="success" className="mb-6">✅ Em estoque - Envio imediato</Badge>
              ) : (
                <Badge variant="error" className="mb-6">❌ Fora de estoque</Badge>
              )}
            </div>

            {/* Description */}
            <Card className="bg-[#1A1A1A] border-[#333] p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Sobre o Produto</h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </Card>

            {/* Benefits */}
            <Card className="bg-[#1A1A1A] border-[#333] p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Benefícios</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-gold text-xl">✓</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-400">Quantidade:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] hover:border-gold transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] hover:border-gold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold text-xl py-6"
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black p-6">
                <Heart className="w-6 h-6" />
              </Button>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black p-6">
                <Share2 className="w-6 h-6" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#1A1A1A] border-[#333] p-4 flex items-center gap-3">
                <Truck className="w-8 h-8 text-gold" />
                <div>
                  <p className="font-bold text-sm">Frete Grátis</p>
                  <p className="text-xs text-gray-400">Acima de R$ 150</p>
                </div>
              </Card>
              <Card className="bg-[#1A1A1A] border-[#333] p-4 flex items-center gap-3">
                <Shield className="w-8 h-8 text-gold" />
                <div>
                  <p className="font-bold text-sm">Garantia 30 dias</p>
                  <p className="text-xs text-gray-400">Devolução grátis</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Additional Info Tabs */}
        <div className="mt-16">
          <Card className="bg-[#1A1A1A] border-[#333] p-8">
            <h3 className="text-2xl font-bold mb-6">Informações Adicionais</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-gold font-bold mb-2">Como Usar</h4>
                <p className="text-gray-300">{product.howToUse}</p>
              </div>

              <div>
                <h4 className="text-gold font-bold mb-2">Ingredientes</h4>
                <p className="text-gray-300 text-sm">{product.ingredients}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* AR Try-On Modal */}
      {showTryOn && (
        <ProductTryOn
          productName={product.name}
          productImage={product.images[0]}
          onClose={() => setShowTryOn(false)}
        />
      )}
    </div>
  );
}
