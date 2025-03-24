
import React, { useEffect } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user.isAuthenticated) {
          navigate('/dashboard');
        }
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, [navigate]);

  const handleAuthSuccess = () => {
    // Navigate is handled in the form component
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-12 sm:px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
            CaptchaPro
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Accédez à votre compte
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <AuthForm onSuccess={handleAuthSuccess} />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            En continuant, vous acceptez nos{' '}
            <a href="#" className="text-blue-600 hover:underline">
              conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-blue-600 hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
