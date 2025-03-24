
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import CaptchaCanvas from './CaptchaCanvas';
import CaptchaInstructions from './CaptchaInstructions';
import { useShapeGenerator } from '@/hooks/useShapeGenerator';
import { useCaptchaValidation } from '@/hooks/useCaptchaValidation';
import { cn } from '@/lib/utils';

interface CaptchaContainerProps {
  onVerified?: () => void;
  width?: number;
  height?: number;
  className?: string;
}

const CaptchaContainer: React.FC<CaptchaContainerProps> = ({
  onVerified,
  width = 320,
  height = 220,
  className
}) => {
  const [canvasSize, setCanvasSize] = useState({ width, height });
  
  // Initialize shape generator
  const {
    shapes,
    targetInfo,
    generateShapes,
    toggleSelectShape,
    resetSelections
  } = useShapeGenerator({
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    shapeCount: 8
  });
  
  // Initialize validation logic
  const {
    isVerified,
    isLoading,
    errorMessage,
    handleValidation,
    reset: resetValidation
  } = useCaptchaValidation({
    onSuccess: onVerified,
    maxAttempts: 3
  });
  
  // Generate shapes on initial load
  useEffect(() => {
    generateShapes();
  }, [generateShapes]);
  
  // Handle shape click
  const handleShapeClick = useCallback((id: string) => {
    toggleSelectShape(id);
  }, [toggleSelectShape]);
  
  // Handle verify button click
  const handleVerify = useCallback(async () => {
    const result = await handleValidation(shapes);
    if (!result) {
      // If validation failed, wait a moment before resetting
      setTimeout(() => {
        resetSelections();
      }, 1000);
    }
  }, [handleValidation, resetSelections, shapes]);
  
  // Handle regenerate CAPTCHA
  const handleRegenerateCaptcha = useCallback(() => {
    resetSelections();
    resetValidation();
    generateShapes();
  }, [generateShapes, resetSelections, resetValidation]);
  
  // Adjust canvas size based on container width
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('captcha-container');
      if (container) {
        const containerWidth = container.clientWidth;
        if (containerWidth < width) {
          setCanvasSize({
            width: containerWidth - 40, // Adjust for padding
            height: height * ((containerWidth - 40) / width) // Maintain aspect ratio
          });
        } else {
          setCanvasSize({ width, height });
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);
  
  return (
    <div 
      id="captcha-container"
      className={cn(
        'flex flex-col space-y-4 p-5 rounded-xl glass bg-white/30 backdrop-blur-md',
        'border border-white/20 shadow-lg transition-all duration-300',
        className
      )}
    >
      <div className="text-center mb-1">
        <h3 className="text-lg font-semibold text-foreground">Human Verification</h3>
      </div>
      
      <CaptchaInstructions 
        targetType={targetInfo?.type}
        targetColor={targetInfo?.color}
        targetCount={targetInfo?.count}
        errorMessage={errorMessage}
        className="animate-fade-in"
      />
      
      <CaptchaCanvas 
        shapes={shapes}
        width={canvasSize.width}
        height={canvasSize.height}
        onShapeClick={handleShapeClick}
        isVerified={isVerified}
        isLoading={isLoading}
        className="mx-auto animate-fade-in"
      />
      
      <div className="flex space-x-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-white/50 hover:bg-white/70"
          onClick={handleRegenerateCaptcha}
          disabled={isLoading}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          New CAPTCHA
        </Button>
        <Button
          className="flex-1"
          onClick={handleVerify}
          disabled={isVerified || isLoading}
        >
          {isLoading ? 'Verifying...' : isVerified ? 'Verified' : 'Verify'}
        </Button>
      </div>
    </div>
  );
};

export default CaptchaContainer;
