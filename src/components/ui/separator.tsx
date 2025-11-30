// src/components/ui/separator.tsx
import React from 'react';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  decorative?: boolean;
  style?: React.CSSProperties;
}

export const Separator: React.FC<SeparatorProps> = ({ 
  orientation = 'horizontal', 
  className = '',
  decorative = true,
  style
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    border: 'none',
    flexShrink: 0,
    ...(orientation === 'horizontal' 
      ? { height: '1px', width: '100%', margin: '20px 0' } 
      : { width: '1px', height: '100%', margin: '0 20px' }),
    ...style
  };

  return (
    <div 
      role={decorative ? 'none' : 'separator'} 
      aria-orientation={orientation}
      style={baseStyle} 
      className={className} 
    />
  );
};

export default Separator;
