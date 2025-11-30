"use client";

import { useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Persistência automática (já está no hook useCart — só pra deixar explícito)
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("alsham-cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-gold text-black px-2 py-1 text-xs font-bold">
              {itemCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-black border-gold/30 text-white max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
            Seu Carrinho
          </DrawerTitle>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <X className="w-6 h-6" />
            </Button>
          </DrawerTrigger>
        </DrawerHeader>

        <div className="px-6 pb-24 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-purple-900/20 p-4 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gold">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                    <X className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 border-t border-gold/30">
            <div className="flex justify-between text-xl mb-4">
              <span>Total</span>
              <span className="text-gold font-bold">R$ {total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="block">
              <Button className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-lg py-6">
                IR PARA CHECKOUT
              </Button>
            </Link>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
