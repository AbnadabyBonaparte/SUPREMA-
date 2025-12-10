import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Z_INDEX } from "@/lib/z-index";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const goToCheckout = () => {
    setOpen(false);
    window.location.href = "/checkout";
  };

  if (!open) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed bottom-6 left-6 bg-gold/90 hover:bg-gold text-black rounded-full shadow-2xl",
          Z_INDEX.header
        )}
        onClick={() => setOpen(true)}
      >
        <ShoppingBag className="w-8 h-8" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className={cn("fixed inset-0 bg-black/80", Z_INDEX.overlay)} onClick={() => setOpen(false)}>
      <div
        className={cn(
          "fixed bottom-0 left-0 w-full max-w-md h-[85vh] bg-black border border-gold/30 rounded-t-3xl shadow-2xl overflow-hidden",
          Z_INDEX.drawer
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gold/30">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
            Seu Carrinho
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto h-full pb-32">
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
            <Button onClick={goToCheckout} className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-lg py-6">
              IR PARA CHECKOUT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
