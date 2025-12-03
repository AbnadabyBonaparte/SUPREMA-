import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getUpsellRecommendation } from "@/services/ai/geminiService";
import { Loader2, Trash2, Plus, Minus, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [upsell, setUpsell] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (cart.length > 0 && !upsell) {
      suggestUpsell();
    }
  }, [cart]);

  const suggestUpsell = async () => {
    setLoading(true);
    try {
      const items = cart.map(i => i.name).join(", ");
      const suggestion = await getUpsellRecommendation(items);
      setUpsell(suggestion);
    } catch (err) {
      console.log("Upsell falhou (normal em dev)", err);
    }
    setLoading(false);
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="p-12 bg-gradient-to-br from-purple-900/50 to-black border-gold/30">
          <p className="text-2xl">Seu carrinho está vazio 😢</p>
          <Button className="mt-6 bg-gold hover:bg-gold/90 text-black font-bold">
            Continuar Comprando
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
          Finalizar Compra
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="bg-gradient-to-r from-purple-900/30 to-black border-gold/20 p-6">
                <div className="flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gold">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Badge variant="secondary" className="text-lg px-4">{item.quantity}</Badge>
                    <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}

            {/* AI UPSELL */}
            {loading && <Card className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></Card>}
            {upsell && (
              <Card className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-pink-500/50 p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <Sparkles className="w-12 h-12 text-gold" />
                  <div>
                    <p className="text-gold font-bold text-lg">AURA Recomenda:</p>
                    <p className="text-2xl font-bold">{upsell.name}</p>
                    <p className="text-sm opacity-80">{upsell.reason}</p>
                    <Button className="mt-4 bg-gold hover:bg-gold/90 text-black font-bold">
                      Adicionar por R$ {upsell.price.toFixed(2)}
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Resumo */}
          <Card className="h-fit bg-gradient-to-b from-gold/10 to-black border-gold/30 p-8">
            <h2 className="text-3xl font-bold mb-6">Resumo do Pedido</h2>
            <div className="space-y-4 text-xl">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-green-500">GRÁTIS</span>
              </div>
              <Separator className="bg-gold/30" />
              <div className="flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span className="text-gold">R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full mt-8 bg-gold hover:bg-gold/90 text-black text-2xl font-bold py-8"
              onClick={handleCheckout}
            >
              FINALIZAR COMPRA
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
