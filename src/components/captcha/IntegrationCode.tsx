
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy } from 'lucide-react';

interface IntegrationCodeProps {
  siteKey?: string;
}

const IntegrationCode: React.FC<IntegrationCodeProps> = ({
  siteKey = 'your-site-key'
}) => {
  const [copied, setCopied] = useState(false);

  // Sample React integration code
  const reactCode = `import { CaptchaAPI } from 'friendly-shape-captcha';

const MyForm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const handleCaptchaVerified = (token) => {
    setIsVerified(true);
    setCaptchaToken(token);
    console.log("CAPTCHA verified with token:", token);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      
      <CaptchaAPI 
        siteKey="${siteKey}"
        onVerified={handleCaptchaVerified}
      />
      
      <input type="hidden" name="captcha-token" value={captchaToken} />
      <button type="submit" disabled={!isVerified}>Submit</button>
    </form>
  );
};`;

  // Sample HTML integration code
  const htmlCode = `<div id="captcha-container"></div>
<input type="hidden" id="captcha-token" name="captcha-token" value="">

<script src="https://cdn.jsdelivr.net/npm/friendly-shape-captcha/dist/captcha.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    FriendlyShapeCaptcha.render('captcha-container', {
      siteKey: '${siteKey}',
      onVerified: function(token) {
        document.getElementById('captcha-token').value = token;
        console.log('CAPTCHA verified with token:', token);
      }
    });
  });
</script>`;

  // Sample API verification code
  const apiCode = `// Server-side verification (Node.js example)
app.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;
  
  try {
    const response = await fetch('https://api.friendly-captcha.com/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: 'your-secret-key',
        token: token
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // CAPTCHA verification successful
      res.json({ success: true });
    } else {
      // CAPTCHA verification failed
      res.status(400).json({ success: false, error: data.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-3">Integration Code</h3>
      
      <Tabs defaultValue="react">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="react">React</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="react" className="relative">
          <pre className="bg-gray-800 text-gray-100 rounded-md p-4 text-sm overflow-x-auto">
            <code>{reactCode}</code>
          </pre>
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute top-2 right-2"
            onClick={() => handleCopy(reactCode)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TabsContent>
        
        <TabsContent value="html" className="relative">
          <pre className="bg-gray-800 text-gray-100 rounded-md p-4 text-sm overflow-x-auto">
            <code>{htmlCode}</code>
          </pre>
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute top-2 right-2"
            onClick={() => handleCopy(htmlCode)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TabsContent>
        
        <TabsContent value="api" className="relative">
          <pre className="bg-gray-800 text-gray-100 rounded-md p-4 text-sm overflow-x-auto">
            <code>{apiCode}</code>
          </pre>
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute top-2 right-2"
            onClick={() => handleCopy(apiCode)}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationCode;
