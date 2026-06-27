import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext.jsx';
import { toast } from 'sonner';

const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-full">
      <div className="aspect-square overflow-hidden bg-muted">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <span className="text-4xl font-bold text-muted-foreground/20">{item.name[0]}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 text-balance">{item.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description || 'Delicious and freshly prepared'}</p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="transition-all duration-200 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;