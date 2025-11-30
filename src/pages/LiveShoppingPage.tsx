import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Users, MessageCircle, Sparkles } from "lucide-react";

export default function LiveShoppingPage() {
  const [viewers] = useState(2847);
  const [products] = useState([
    { id: 1, name: "Metal Detox L'Oréal", price: 289, sold: 127 },
    { id: 2, name: "Perfume Sauvage Dior", price: 699, sold: 89 },
    { id: 3, name: "Base Fenty Beauty", price: 249, sold: 312 },
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Player */}
      <div className="relative">
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 h-96 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-24 h-24 text-gold mx-auto animate-pulse" />
            <p className="text-4xl font-bold mt-8">LIVE COM AURA — AO VIVO AGORA</p>
            <Badge className="mt-4 text-2xl px-8 py-3 bg-red-600">🔴 AO VIVO</Badge>
          </div>
        </div>

        {/* Indicadores */}
        <div className="absolute top-4 left-4 flex gap-4">
          <Badge className="text-lg px-6 py-3 bg-red-600 flex items-center gap-2">
            <Users className="w-5 h-5" />
            {viewers.toLocaleString()} assistindo
          </Badge>
          <Badge className="text-lg px-6 py-3 bg-gold text-black">
            <MessageCircle className="w-5 h-5" />
            892 comentários
          </Badge>
        </div>
      </div>

      {/* Produtos em Destaque */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gold to-pink-500 bg-clip-text text-transparent">
          Produtos em Destaque na Live
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-gradient-to-br from-purple-900/50 to-black border-gold/30 overflow-hidden group hover:border-gold transition-all">
              <div className="bg-gray-800 h-64 flex items-center justify-center">
                <ShoppingBag className="w-24 h-24 text-gold/50" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-3xl font-bold text-gold">R$ {product.price}</p>
                    <p className="text-sm text-gray-400">{product.sold} vendidos na live</p>
                  </div>
                  <Button className="bg-gold hover:bg-gold/90 text-black font-bold text-lg px-8">
                    COMPRAR AGORA
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-2xl px-16 py-8">
            ENTRAR NA LIVE E COMPRAR COM DESCONTO EXCLUSIVO
          </Button>
        </div>
      </div>
    </div>
  );
}
