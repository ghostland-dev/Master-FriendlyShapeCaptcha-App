
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CaptchaAPI from '@/components/captcha/CaptchaAPI';
import IntegrationCode from '@/components/captcha/IntegrationCode';
import { toast } from '@/components/ui/use-toast';

const Api = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [siteKey, setSiteKey] = useState("demo-site-key");
  const [generatedSiteKey, setGeneratedSiteKey] = useState("");

  const handleVerified = (token: string) => {
    setIsVerified(true);
    setCaptchaToken(token);
    toast({
      title: "CAPTCHA Verified",
      description: `Token generated: ${token.substring(0, 10)}...`,
    });
  };

  const generateApiKey = () => {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const newSiteKey = `site_${randomPart}`;
    setGeneratedSiteKey(newSiteKey);
    toast({
      title: "API Key Generated",
      description: "This is a demo key. In production, register for an official key.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 to-gray-100 px-4 py-12 sm:px-6">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-20 [background-size:20px_20px]"></div>
      </div>
      
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
            Friendly Shape CAPTCHA API
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Integrate human-friendly verification into your own applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h2 className="text-xl font-medium mb-4">Live Demo</h2>
            <div className="flex flex-col items-center mb-6">
              <CaptchaAPI 
                onVerified={handleVerified}
                siteKey={siteKey}
              />
            </div>
            
            {isVerified && (
              <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md">
                <p className="text-sm text-green-700">
                  Verification successful! Token:
                </p>
                <p className="text-xs font-mono bg-white/80 p-2 rounded mt-1 overflow-x-auto">
                  {captchaToken}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
            <h2 className="text-xl font-medium mb-4">Get API Key</h2>
            <p className="text-sm text-gray-600 mb-4">
              Generate a demo API key for testing. In production, you would register for an official key.
            </p>
            
            <div className="flex gap-3 mb-4">
              <Button onClick={generateApiKey}>
                Generate Demo Key
              </Button>
            </div>
            
            {generatedSiteKey && (
              <div className="mt-4">
                <p className="text-sm font-medium">Your Site Key:</p>
                <div className="flex mt-1">
                  <Input 
                    value={generatedSiteKey} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedSiteKey);
                      toast({
                        title: "Copied!",
                        description: "Site key copied to clipboard",
                      });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6">Integration Options</h2>
          <IntegrationCode siteKey={generatedSiteKey || "your-site-key"} />
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30 mb-12">
          <h2 className="text-2xl font-medium mb-4">API Documentation</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Client-Side Integration</h3>
            <p className="text-gray-700 mb-4">
              You can integrate the CAPTCHA into your application using React components or via the JavaScript snippet.
              The CAPTCHA will handle user interactions and generate a verification token upon successful completion.
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Server-Side Verification</h3>
            <p className="text-gray-700 mb-4">
              When a user submits a form with a CAPTCHA token, you should verify it on your server:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Receive the token from the client</li>
              <li>Send the token to our verification endpoint</li>
              <li>Check the response to confirm validity</li>
              <li>Process the user's request if verification is successful</li>
            </ol>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              Return to Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Api;
