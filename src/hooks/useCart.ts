import { useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('alsham-cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar carrinho', e);
      }
    }
  }, []);

  // Salva no localStorage
  useEffect(() => {
    localStorage.setItem('alsham-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
  };
};
