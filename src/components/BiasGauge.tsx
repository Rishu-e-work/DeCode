
import React from 'react';

interface BiasGaugeProps {
  biasScore: number; // -100 to +100
  size?: 'sm' | 'md' | 'lg';
}

const BiasGauge = ({ biasScore, size = 'md' }: BiasGaugeProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-4 w-48';
      case 'lg': return 'h-8 w-80';
      default: return 'h-6 w-64';
    }
  };

  const getIndicatorPosition = () => {
    // Convert -100 to 100 scale to 0 to 100% position
    return ((biasScore + 100) / 200) * 100;
  };

  const getColorClass = () => {
    if (biasScore < -20) return 'bg-blue-500';
    if (biasScore > 20) return 'bg-red-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-2">
      <div className={`relative ${getSizeClasses()} bg-gradient-to-r from-blue-500 via-green-200 to-red-500 rounded-full shadow-inner`}>
        {/* Center line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-800 dark:bg-gray-200 opacity-50" />
        
        {/* Indicator */}
        <div 
          className={`absolute top-0 h-full w-1 ${getColorClass()} rounded-full shadow-lg transition-all duration-500`}
          style={{ left: `${getIndicatorPosition()}%`, transform: 'translateX(-50%)' }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>Left (-100)</span>
        <span>Neutral (0)</span>
        <span>Right (+100)</span>
      </div>
      
      <div className="text-center">
        <span className={`font-semibold ${getColorClass().replace('bg-', 'text-')}`}>
          Score: {biasScore > 0 ? '+' : ''}{biasScore}
        </span>
      </div>
    </div>
  );
};

export default BiasGauge;
