
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CaptchaContainer from '@/components/captcha/CaptchaContainer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, CheckCircle, ShieldCheck, BarChart3 } from 'lucide-react';

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setIsLoggedIn(user.isAuthenticated);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
    toast({
      title: "Verification Réussie",
      description: "Vous avez confirmé que vous êtes humain.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-gray-100">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="text-xl font-semibold">CaptchaPro</div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/pricing')}>
            Tarifs
          </Button>
          <Button variant="ghost" onClick={() => navigate('/api')}>
            API
          </Button>
          {isLoggedIn ? (
            <Button onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              Connexion
            </Button>
          )}
        </nav>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Sécurisez votre site avec un CAPTCHA convivial
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Une alternative intuitive et accessible aux CAPTCHAs traditionnels pour protéger vos sites contre les robots tout en offrant une expérience utilisateur agréable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/pricing')}>
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/api')}>
                Explorer l'API
              </Button>
            </div>
          </div>
          
          <div className="max-w-md mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200 mb-16">
            <CaptchaContainer
              onVerified={handleVerified}
              width={320}
              height={220}
              className="mx-auto"
            />
            
            {isVerified && (
              <div className="mt-6 text-center animate-fade-in">
                <p className="mb-4 text-green-700 font-medium flex items-center justify-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Merci d'avoir confirmé que vous êtes humain !
                </p>
                <Button 
                  onClick={() => setIsVerified(false)}
                  variant="outline"
                  className="mr-3"
                >
                  Réinitialiser démo
                </Button>
              </div>
            )}
          </div>
          
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
              Pourquoi choisir CaptchaPro ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Protection efficace</h3>
                <p className="text-gray-600">
                  Bloquez les robots et les tentatives de spam automatisées tout en laissant passer les utilisateurs légitimes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Facile à utiliser</h3>
                <p className="text-gray-600">
                  Expérience intuitive basée sur des formes simples, accessible à tous les utilisateurs, y compris ceux ayant des déficiences visuelles.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Statistiques détaillées</h3>
                <p className="text-gray-600">
                  Suivez les performances de votre protection avec des analyses détaillées et des rapports sur les tentatives de fraude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              © {new Date().getFullYear()} CaptchaPro. Tous droits réservés.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Conditions d'utilisation</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Confidentialité</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
