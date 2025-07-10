
import React from 'react';
import { SentenceHighlight } from '@/types/analysis';

interface SentenceHighlighterProps {
  text: string;
  highlights: SentenceHighlight[];
}

const SentenceHighlighter = ({ text, highlights }: SentenceHighlighterProps) => {
  const getHighlightColor = (bias: "Left" | "Right" | "Neutral", intensity: number) => {
    const opacity = Math.max(0.2, intensity / 100);
    
    switch (bias) {
      case 'Left':
        return `rgba(59, 130, 246, ${opacity})`; // blue
      case 'Right':
        return `rgba(239, 68, 68, ${opacity})`; // red
      default:
        return `rgba(156, 163, 175, ${opacity})`; // gray
    }
  };

  const getBorderColor = (bias: "Left" | "Right" | "Neutral") => {
    switch (bias) {
      case 'Left': return 'border-blue-400';
      case 'Right': return 'border-red-400';
      default: return 'border-gray-400';
    }
  };

  // Sort highlights by start index to process them in order
  const sortedHighlights = [...highlights].sort((a, b) => a.startIndex - b.startIndex);
  
  if (sortedHighlights.length === 0) {
    return <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>;
  }

  const segments = [];
  let currentIndex = 0;

  sortedHighlights.forEach((highlight, index) => {
    // Add text before highlight
    if (currentIndex < highlight.startIndex) {
      segments.push(
        <span key={`text-${index}`}>
          {text.slice(currentIndex, highlight.startIndex)}
        </span>
      );
    }

    // Add highlighted text
    segments.push(
      <span
        key={`highlight-${index}`}
        className={`px-1 rounded border-l-2 ${getBorderColor(highlight.bias)} transition-all duration-200 hover:shadow-sm`}
        style={{ backgroundColor: getHighlightColor(highlight.bias, highlight.intensity) }}
        title={`${highlight.bias} bias detected (${highlight.intensity}% intensity)`}
      >
        {highlight.text}
      </span>
    );

    currentIndex = highlight.endIndex;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    segments.push(
      <span key="text-end">
        {text.slice(currentIndex)}
      </span>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-400 rounded border border-blue-500"></div>
          <span>Left-leaning</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-400 rounded border border-red-500"></div>
          <span>Right-leaning</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-400 rounded border border-gray-500"></div>
          <span>Neutral</span>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {segments}
      </p>
    </div>
  );
};

export default SentenceHighlighter;
