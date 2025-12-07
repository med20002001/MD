import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SubscribeDropdown } from '../dropdowns';

export default function SubscribeButton() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="mt-6 text-right">
      <div className="relative inline-block">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium inline-flex items-center gap-2"
        >
          S'abonner au calendrier
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showDropdown && (
          <SubscribeDropdown onClose={() => setShowDropdown(false)} />
        )}
      </div>
    </div>
  );
}
