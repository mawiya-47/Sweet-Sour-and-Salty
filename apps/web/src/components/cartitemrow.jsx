import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext.jsx';

const CartItemRow = ({ cartItem }) => {
  const { item, quantity } = cartItem;
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <span className="text-2xl font-bold text-muted-foreground/20">{item.name[0]}</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.category}</p>
        <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, quantity - 1)}
          className="h-8 w-8 transition-all duration-200"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-semibold">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(item.id, quantity + 1)}
          className="h-8 w-8 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">${(item.price * quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          className="text-destructive hover:text-destructive transition-all duration-200 mt-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItemRow;