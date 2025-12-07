import React from 'react';
import type { ViewType } from '../types';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const VIEWS: Array<{ label: string; value: ViewType }> = [
  { label: 'Liste', value: 'liste' },
  { label: 'Mois', value: 'mois' },
  { label: 'Jour', value: 'jour' },
];

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <>
      {VIEWS.map((view) => (
        <button
          key={view.value}
          onClick={() => onViewChange(view.value)}
          className={`px-4 py-2 rounded-md font-medium ${
            currentView === view.value 
              ? 'bg-gray-900 text-white' 
              : 'bg-white text-gray-700 border'
          }`}
        >
          {view.label}
        </button>
      ))}
    </>
  );
}
