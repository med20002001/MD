import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ViewType } from '../types';

interface NavigationProps {
  view: ViewType;
  onPrevious: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

export default function Navigation({ view, onPrevious, onNext, children }: NavigationProps) {
  return (
    <div className="flex items-center gap-4">
      <button onClick={onPrevious} className="p-2 hover:bg-gray-100 rounded">
        <ChevronLeft className="w-5 h-5" />
      </button>
      {/* ✅ TOUJOURS afficher le bouton suivant */}
      <button onClick={onNext} className="p-2 hover:bg-gray-100 rounded">
        <ChevronRight className="w-5 h-5" />
      </button>
      {children}
    </div>
  );
}
