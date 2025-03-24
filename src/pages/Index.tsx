
import React, { useState } from 'react';
import CaptchaContainer from '@/components/captcha/CaptchaContainer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerified = () => {
    setIsVerified(true);
    toast({
      title: "Verification Successful",
      description: "You have successfully verified that you are human.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-8 sm:px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
            Friendly Shape CAPTCHA
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Human-friendly visual verification
          </p>
        </div>
        
        <div className="animate-slide-in">
          <CaptchaContainer
            onVerified={handleVerified}
            width={320}
            height={220}
            className="mx-auto"
          />
        </div>
        
        {isVerified && (
          <div className="mt-8 text-center animate-fade-in">
            <p className="mb-4 text-green-700 font-medium">
              Thank you for confirming you're human!
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => setIsVerified(false)}
                variant="outline"
                className="mr-3"
              >
                Reset Demo
              </Button>
              <Button>
                Continue to Application
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-12 text-center text-sm text-gray-500 animate-fade-in">
          <p>
            A human-friendly alternative to traditional CAPTCHAs
          </p>
          <p className="mt-1">
            Select the shapes that match the instructions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
