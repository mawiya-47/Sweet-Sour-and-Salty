import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const OrderCard = ({ order }) => {
  const statusColors = {
    'Pending': 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    'Confirmed': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
    'Preparing': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    'Ready': 'bg-green-500/10 text-green-700 border-green-500/20',
    'Delivered': 'bg-gray-500/10 text-gray-700 border-gray-500/20'
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {format(new Date(order.created), 'MMM dd, yyyy - h:mm a')}
            </p>
          </div>
          <Badge className={statusColors[order.status] || statusColors['Pending']}>
            {order.status || 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {order.items && order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${order.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;