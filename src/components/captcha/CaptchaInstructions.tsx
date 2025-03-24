
import React from 'react';
import { cn } from '@/lib/utils';

interface CaptchaInstructionsProps {
  targetType?: string;
  targetColor?: string;
  targetCount?: number;
  errorMessage?: string | null;
  className?: string;
  showApiInfo?: boolean;
}

const CaptchaInstructions: React.FC<CaptchaInstructionsProps> = ({
  targetType,
  targetColor,
  targetCount = 0,
  errorMessage,
  className,
  showApiInfo = false
}) => {
  // Helper function to format the color name
  const formatColorName = (color: string) => {
    // Convert hex to color name
    const colorMap: Record<string, string> = {
      '#3B82F6': 'blue',
      '#10B981': 'green',
      '#F59E0B': 'yellow',
      '#EF4444': 'red',
      '#8B5CF6': 'purple',
      '#EC4899': 'pink'
    };
    
    return colorMap[color] || color;
  };

  // Generate instruction based on target parameters
  const getInstruction = () => {
    if (!targetType) return 'Loading...';
    
    const colorName = targetColor ? formatColorName(targetColor) : 'any color';
    const pluralSuffix = targetCount && targetCount > 1 ? 's' : '';
    const countText = targetCount ? `all ${targetCount}` : 'all';
    
    return (
      <>
        <span className="font-medium">Please select {countText} {colorName} {targetType}{pluralSuffix}</span>
      </>
    );
  };

  return (
    <div 
      className={cn(
        'rounded-lg p-4 bg-white/80 backdrop-blur-sm border border-white/10 shadow-sm',
        'transition-all duration-300',
        errorMessage ? 'bg-red-50/80 border-red-100' : 'bg-white/80 border-white/10',
        className
      )}
    >
      <div className="flex flex-col space-y-2">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            {showApiInfo ? 'Friendly Shape CAPTCHA™' : 'To verify you\'re human'}
          </p>
          <p className="text-base">
            {getInstruction()}
          </p>
        </div>
        
        {errorMessage && (
          <div className="mt-2 text-sm text-red-500 text-center animate-fade-in">
            {errorMessage}
          </div>
        )}
        
        {showApiInfo && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            <a href="/api" className="text-blue-500 hover:underline">
              Want to use this in your app?
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptchaInstructions;
