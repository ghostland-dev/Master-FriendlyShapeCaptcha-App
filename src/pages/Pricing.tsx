
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCard, { PricingPlan } from '@/components/pricing/PricingCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  
  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Gratuit',
      price: 0,
      description: 'Pour les sites personnels et les petits projets',
      features: [
        '1,000 vérifications par mois',
        '1 domaine',
        'Support email',
        'Badge CaptchaPro inclus'
      ],
      cta: 'Commencer gratuitement'
    },
    {
      id: 'starter',
      name: 'Démarrage',
      price: 19,
      description: 'Pour les sites professionnels avec un trafic modéré',
      features: [
        '25,000 vérifications par mois',
        '3 domaines',
        'Support prioritaire',
        'Sans badge CaptchaPro',
        'Statistiques basiques'
      ],
      cta: 'Essai gratuit de 14 jours',
      isPopular: true
    },
    {
      id: 'business',
      name: 'Business',
      price: 49,
      description: 'Pour les entreprises avec un trafic important',
      features: [
        '100,000 vérifications par mois',
        '10 domaines',
        'Support premium',
        'Sans badge CaptchaPro',
        'Statistiques avancées',
        'API personnalisée'
      ],
      cta: 'Essai gratuit de 14 jours'
    }
  ];

  const handleSelectPlan = (plan: PricingPlan) => {
    const isLoggedIn = localStorage.getItem('user');
    
    if (isLoggedIn) {
      navigate('/dashboard/billing', { state: { selectedPlan: plan.id } });
    } else {
      navigate('/auth', { state: { redirectTo: '/dashboard/billing', selectedPlan: plan.id } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-16 sm:px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-4">
            Plans et tarifs
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Choisissez le plan qui correspond le mieux à vos besoins. Tous les plans incluent notre CAPTCHA innovant pour protéger vos sites.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
        
        <div className="bg-white rounded-xl border p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Vous avez des besoins spécifiques ?</h2>
          <p className="text-gray-600 mb-6">
            Nous proposons également des plans personnalisés pour les grandes entreprises
            et les sites à fort trafic. Contactez notre équipe commerciale pour obtenir
            une offre adaptée à vos besoins.
          </p>
          <Button variant="outline">Contacter l'équipe commerciale</Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
