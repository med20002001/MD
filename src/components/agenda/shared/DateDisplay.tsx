import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DateDisplayProps {
  text: string;
  onClick: () => void;
}

export default function DateDisplay({ text, onClick }: DateDisplayProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-lg font-medium hover:bg-gray-100 px-3 py-1 rounded"
    >
      {text}
      <ChevronDown className="w-4 h-4" />
    </button>
  );
}
