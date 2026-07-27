// @vsc repo:vsc-project-169-frontend file:src/components/ui/Spinner.tsx task:f6-src-components-ui-spinner-tsx module:frontend session:169
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  'aria-label': ariaLabel = 'در حال بارگذاری...',
}) => {
  const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const baseClasses = 'border-2 border-primary-500 border-t-transparent rounded-full animate-spin';
  const sizeClass = sizeMap[size] ?? sizeMap['md'];

  return (
    <div
      className={`${baseClasses} ${sizeClass} ${className}`}
      role="status"
      aria-label={ariaLabel}
    />
  );
};

export default Spinner;
