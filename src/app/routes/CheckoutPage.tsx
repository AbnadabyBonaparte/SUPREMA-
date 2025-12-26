// src/app/routes/CheckoutPage.tsx (REFATORADO DYNASTY)

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getUpsellRecommendation, UpsellRecommendation } from "@/services/ai/geminiService";
import { Loader2, Trash2, Plus, Minus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [upsell, setUpsell] = useState<UpsellRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cart.length > 0 && upsell.length === 0) {
      suggestUpsell();
    }
  }, [cart, upsell.length]);

  const suggestUpsell = async () => {
    setLoading(true);
    try {
      const items = cart.map(i => i.name);
      const suggestions = await getUpsellRecommendation(items);
      setUpsell(suggestions);
    } catch (err) {
      console.log("Upsell falhou (normal em dev)", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    toast({
      title: "🎉 Compra finalizada com sucesso!",
      description: `Total: R$ ${total.toFixed(2).replace(".", ",")}`,
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-obsidian-950 text-marble-50 flex items-center justify-center"
      >
        <Card className="p-16 text-center border-sovereign-gold-700/20">
          <p className="text-3xl font-display mb-8">Seu carrinho está vazio</p>
          <Button variant="gold" size="lg">
            Continuar Comprando
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-obsidian-950 py-20 px-6"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-display text-center mb-16 bg-gradient-to-r from-sovereign-gold-500 to-sovereign-gold-300 bg-clip-text text-transparent">
          Finalizar Compra
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Produtos + Upsell */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div variants={staggerContainer}>
              {cart.map((item, idx) => (
                <motion.div key={item.id} variants={fadeInUp} transition={{ delay: idx * 0.1 }}>
                  <Card className="p-6 hover:border-sovereign-gold-700/40 transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center gap-6">
                      <img src={item.image} alt={item.name} className="w-28 h-28 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="text-2xl font-display text-white">{item.name}</h3>
                        <p className="text-sovereign-gold-500 text-xl">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-5 h-5" />
                        </Button>
                        <Badge variant="gold">{item.quantity}</Badge>
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-6 h-6 text-ruby-600" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* AI UPSELL */}
            {loading && (
              <Card className="p-12 text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-sovereign-gold-600" />
              </Card>
            )}
            {upsell.length > 0 && (
              <motion.div variants={fadeInUp}>
                <Card className="p-8 bg-gradient-to-br from-sovereign-gold-900/20 to-obsidian-900 border-sovereign-gold-700/40">
                  <div className="flex items-center gap-6">
                    <Sparkles className="w-16 h-16 text-sovereign-gold-600" />
                    <div>
                      <p className="text-sovereign-gold-500 font-display text-2xl mb-4">AURA Recomenda</p>
                      {upsell.map((rec, idx) => (
                        <div key={idx} className="mb-6">
                          <h4 className="text-3xl font-display text-white mb-2">{rec.productName}</h4>
                          <p className="text-marble-50/80 mb-3">{rec.reason}</p>
                          <Button variant="gold" size="lg">
                            Adicionar por {rec.price}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Resumo */}
          <motion.div variants={fadeInUp}>
            <Card className="h-fit p-10 bg-obsidian-900/80 border-sovereign-gold-700/30">
              <h2 className="text-4xl font-display mb-8">Resumo do Pedido</h2>
              <div className="space-y-6 text-2xl">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>Frete</span>
                  <span>GRÁTIS</span>
                </div>
                <div className="border-t border-sovereign-gold-700/30 pt-6">
                  <div className="flex justify-between text-4xl font-display">
                    <span>Total</span>
                    <span className="text-sovereign-gold-500">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="gold"
                size="lg"
                className="w-full mt-10 text-2xl py-8"
                onClick={handleCheckout}
              >
                FINALIZAR COMPRA
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
