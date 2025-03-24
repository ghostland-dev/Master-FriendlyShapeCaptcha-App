
import React, { useCallback, useState } from 'react';
import CaptchaContainer from './CaptchaContainer';
import { toast } from '@/components/ui/use-toast';

interface CaptchaAPIProps {
  onVerified?: (token: string) => void;
  onFailure?: () => void;
  siteKey?: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * CaptchaAPI component - Use this to integrate the Shape CAPTCHA into any application
 */
const CaptchaAPI: React.FC<CaptchaAPIProps> = ({
  onVerified,
  onFailure,
  siteKey = 'demo-site-key',
  width = 320,
  height = 220,
  className
}) => {
  const [token, setToken] = useState<string | null>(null);

  // Generate a verification token when CAPTCHA is verified
  const handleVerified = useCallback(() => {
    // Create a verification token (in a real implementation, this would be signed on the server)
    const newToken = generateVerificationToken(siteKey);
    setToken(newToken);
    onVerified?.(newToken);
  }, [onVerified, siteKey]);

  // Handle verification failure
  const handleFailure = useCallback(() => {
    setToken(null);
    onFailure?.();
  }, [onFailure]);

  return (
    <div className="captcha-api-container">
      <CaptchaContainer
        onVerified={handleVerified}
        onFailure={handleFailure}
        width={width}
        height={height}
        className={className}
      />
      
      {token && (
        <input type="hidden" name="captcha-token" value={token} />
      )}
    </div>
  );
};

// Helper function to generate a verification token
// In a real implementation, this would be validated on the server
const generateVerificationToken = (siteKey: string): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 10);
  // This is a simple demo token. In production, you would use a proper JWT or other secure token
  return `${siteKey}_${timestamp}_${randomPart}`;
};

export default CaptchaAPI;
