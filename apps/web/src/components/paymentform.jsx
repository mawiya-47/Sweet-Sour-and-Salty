import React, { useState } from 'react';
import { CreditCard, Wallet } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PaymentForm = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Payment method</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer flex-1">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <span>Credit / Debit Card</span>
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer flex-1">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <span>Cash on Delivery</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentForm;