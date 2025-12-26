// src/components/SubscriptionBoxPreview.tsx
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Package, Calendar, TrendingUp, X, Loader2 } from 'lucide-react';
import { useSubscriptionBoxes } from '@/hooks/useSubscriptionBoxes';

interface SubscriptionBoxPreviewProps {
  onSubscribe?: () => void;
}

export default function SubscriptionBoxPreview({ onSubscribe }: SubscriptionBoxPreviewProps) {
  const { boxes: supabaseBoxes, loading, error } = useSubscriptionBoxes();
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  // Transform Supabase boxes to match component format
  const boxes = useMemo(() => {
    if (!supabaseBoxes || supabaseBoxes.length === 0) return {};
    
    const boxesMap: Record<string, any> = {};
    supabaseBoxes.forEach((box) => {
      const tierKey = box.tier.toLowerCase().replace(/\s+/g, '_');
      boxesMap[tierKey] = {
        name: box.name || box.tier,
        price: box.price,
        products: box.product_details?.length || box.products?.length || 0,
        value: box.product_details?.reduce((sum: number, p: any) => sum + (p.price || 0), 0) || box.price * 1.5,
        items: box.product_details?.map((p: any) => ({
          name: p.name,
          category: p.category || 'Geral',
        })) || [],
        color: tierKey === 'luxury' ? 'from-purple-500 to-pink-500' : 
               tierKey === 'premium' ? 'from-gold to-yellow-300' : 
               'from-blue-500 to-cyan-500',
        id: box.id,
      };
    });
    
    // Set default selected tier
    if (!selectedTier && Object.keys(boxesMap).length > 0) {
      setSelectedTier(Object.keys(boxesMap)[0]);
    }
    
    return boxesMap;
  }, [supabaseBoxes, selectedTier]);

  // Fallback data structure (only used if Supabase has no data)
  const fallbackBoxes = {
    essentials: {
      name: 'Essentials Box',
      price: 89.90,
      products: 3,
      value: 150,
      items: [
        { name: 'Shampoo do Mês', category: 'Cabelo' },
        { name: 'Máscara Hidratante', category: 'Cabelo' },
        { name: 'Sérum Facial', category: 'Skincare' }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    premium: {
      name: 'Premium Box',
      price: 149.90,
      products: 5,
      value: 280,
      items: [
        { name: 'Shampoo Premium', category: 'Cabelo' },
        { name: 'Condicionador Premium', category: 'Cabelo' },
        { name: 'Máscara Capilar', category: 'Cabelo' },
        { name: 'Óleo Facial', category: 'Skincare' },
        { name: 'Creme Noturno', category: 'Skincare' }
      ],
      color: 'from-gold to-yellow-300'
    },
    luxury: {
      name: 'Luxury Box',
      price: 249.90,
      products: 7,
      value: 450,
      items: [
        { name: 'Shampoo Luxury Line', category: 'Cabelo' },
        { name: 'Condicionador Luxury', category: 'Cabelo' },
        { name: 'Máscara Reparadora', category: 'Cabelo' },
        { name: 'Sérum Anti-Idade', category: 'Skincare' },
        { name: 'Creme Facial Premium', category: 'Skincare' },
        { name: 'Perfume Exclusivo', category: 'Fragrância' },
        { name: 'Acessório Surprise', category: 'Extra' }
      ],
      color: 'from-purple-500 to-pink-500'
    }
  };

  const currentBox = boxes[selectedTier];
  const savings = currentBox.value - currentBox.price;
  const savingsPercent = Math.round((savings / currentBox.value) * 100);

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      alert(`✅ Assinatura ${currentBox.name} confirmada! Primeira box chega em 7 dias.`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted">Carregando boxes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-error mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </div>
    );
  }

  if (!currentBox || Object.keys(boxes).length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-lg mb-4">Nenhuma box de assinatura disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Package className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Subscription Boxes</h2>
        </div>
        <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
          Receba mensalmente produtos selecionados por IA baseados no seu perfil e preferências
        </p>
      </div>

      {/* Tier Selector */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(boxes).map(([tier, box]) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier as any)}
            className={`relative overflow-hidden rounded-xl transition-all ${
              selectedTier === tier
                ? 'ring-4 ring-gold scale-105'
                : 'ring-2 ring-border hover:ring-primary/50'
            }`}
          >
            <Card className={`bg-gradient-to-br ${box.color} p-6 text-center`}>
              <h3 className="text-2xl font-bold text-white mb-2">{box.name}</h3>
              <div className="text-4xl font-bold text-white mb-2">
                R$ {box.price.toFixed(2)}
              </div>
              <p className="text-white/80 text-sm mb-4">{box.products} produtos/mês</p>
              <Badge variant="default" className="bg-white/20 text-white border-white/30">
                Economize {savingsPercent}%
              </Badge>
            </Card>
          </button>
        ))}
      </div>

      {/* Selected Box Preview */}
      <Card className={`bg-gradient-to-br ${currentBox.color} p-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{currentBox.name} de Dezembro</h3>
              <p className="text-white/80">Curadoria personalizada por IA</p>
            </div>
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              {showPreview ? 'Ocultar' : 'Ver'} Prévia
            </Button>
          </div>

          {showPreview && (
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {currentBox.items.map((item, idx) => (
                <Card key={idx} className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{item.name}</p>
                      <p className="text-white/60 text-sm">{item.category}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Valor Total dos Produtos</p>
              <p className="text-white text-3xl font-bold">R$ {currentBox.value.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Você Paga</p>
              <p className="text-white text-3xl font-bold">R$ {currentBox.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Economia</p>
              <p className="text-green-300 text-3xl font-bold">R$ {savings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-surface border-border p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gold" />
          </div>
          <h4 className="text-white font-bold mb-2">Curadoria IA</h4>
          <p className="text-muted text-sm">
            Produtos selecionados por IA baseados no seu perfil e histórico
          </p>
        </Card>

        <Card className="bg-surface border-border p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-blue-400" />
          </div>
          <h4 className="text-white font-bold mb-2">Entrega Mensal</h4>
          <p className="text-muted text-sm">
            Receba sua box todo dia 15 do mês, sem surpresas
          </p>
        </Card>

        <Card className="bg-surface border-border p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <h4 className="text-white font-bold mb-2">Sempre Novidades</h4>
          <p className="text-muted text-sm">
            Produtos exclusivos e lançamentos antes de todo mundo
          </p>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button
          onClick={handleSubscribe}
          className="bg-gold hover:bg-gold/90 text-black font-bold text-xl px-12 py-6"
        >
          <Package className="w-6 h-6 mr-3" />
          Assinar {currentBox.name} - R$ {currentBox.price.toFixed(2)}/mês
        </Button>
        <p className="text-gray-400 text-sm mt-4">
          Cancele quando quiser • Primeira box com 20% de desconto
        </p>
      </div>

      {/* How It Works */}
      <Card className="bg-surface border-primary/30 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Como Funciona</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Escolha seu Plano', desc: 'Selecione entre Essentials, Premium ou Luxury' },
            { step: 2, title: 'IA Personaliza', desc: 'Nossa IA analisa seu perfil e preferências' },
            { step: 3, title: 'Receba em Casa', desc: 'Box chega todo dia 15 com produtos exclusivos' },
            { step: 4, title: 'Aproveite', desc: 'Teste, use e apaixone-se pelos produtos' }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gold text-black font-bold text-xl flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
