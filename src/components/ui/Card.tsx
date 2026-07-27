// @vsc repo:vsc-project-169-frontend file:src/components/ui/Card.tsx task:f6-src-components-ui-card-tsx module:frontend session:169
import React from 'react';

interface CardProps {
  className?: string;
  elevated?: boolean;
  outlined?: boolean;
  children: React.ReactNode;
}

const Card = ({
  className = '',
  elevated = false,
  outlined = false,
  children,
}: CardProps) => {
  const baseClasses = [
    outlined ? '' : 'bg-white',
    'border',
    'border-gray-200',
    'rounded-lg',
    'shadow-sm',
    elevated ? 'shadow-md' : '',
    'p-6',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${baseClasses} ${className}`} dir="rtl">
      {children}
    </div>
  );
};

export default Card;
