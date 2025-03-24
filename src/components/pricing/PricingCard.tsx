
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: (plan: PricingPlan) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  return (
    <div className={`rounded-xl border bg-card shadow-sm transition-all hover:shadow-md ${
      plan.isPopular ? 'border-primary relative' : 'border-muted'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Populaire
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">{plan.price === 0 ? 'Gratuit' : `${plan.price}€`}</span>
          {plan.price > 0 && <span className="ml-1 text-muted-foreground">/mois</span>}
        </div>
        
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
        
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="mt-8 w-full" 
          variant={plan.isPopular ? "default" : "outline"}
          onClick={() => onSelect?.(plan)}
        >
          {plan.cta}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
