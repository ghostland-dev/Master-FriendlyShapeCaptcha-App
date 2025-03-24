
import { useState, useCallback } from 'react';
import { Shape } from './useShapeGenerator';

interface UseCaptchaValidationProps {
  onSuccess?: () => void;
  onFailure?: () => void;
  maxAttempts?: number;
}

export const useCaptchaValidation = ({
  onSuccess,
  onFailure,
  maxAttempts = 3
}: UseCaptchaValidationProps = {}) => {
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if the user selected all target shapes and only target shapes
  const validateSelection = useCallback((shapes: Shape[]): boolean => {
    const targetShapes = shapes.filter(shape => shape.isTarget);
    const selectedShapes = shapes.filter(shape => shape.isSelected);
    
    // Check if all selected shapes are targets
    const allSelectedAreTargets = selectedShapes.every(shape => shape.isTarget);
    
    // Check if all targets are selected
    const allTargetsAreSelected = targetShapes.every(shape => shape.isSelected);
    
    return allSelectedAreTargets && allTargetsAreSelected && selectedShapes.length > 0;
  }, []);

  const handleValidation = useCallback(async (shapes: Shape[]) => {
    if (isVerified) return true;
    
    setIsLoading(true);
    setErrorMessage(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const isValid = validateSelection(shapes);
    
    if (isValid) {
      setIsVerified(true);
      onSuccess?.();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setErrorMessage("Too many failed attempts. Try a new CAPTCHA.");
        onFailure?.();
      } else {
        setErrorMessage(`Incorrect selection. You have ${maxAttempts - newAttempts} attempts remaining.`);
      }
    }
    
    setIsLoading(false);
    return isValid;
  }, [attempts, isVerified, maxAttempts, onFailure, onSuccess, validateSelection]);

  const reset = useCallback(() => {
    setAttempts(0);
    setIsVerified(false);
    setErrorMessage(null);
  }, []);

  return {
    attempts,
    isVerified,
    isLoading,
    errorMessage,
    validateSelection,
    handleValidation,
    reset
  };
};
