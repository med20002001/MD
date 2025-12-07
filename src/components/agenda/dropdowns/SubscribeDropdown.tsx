import React, { useRef } from 'react';
import { useClickOutside } from '../shared/hooks';

interface SubscribeDropdownProps {
  onClose: () => void;
}

export default function SubscribeDropdown({ onClose }: SubscribeDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, onClose);

  const handleSubscribe = (type: string) => {
    alert(`Fonctionnalité ${type} à venir`);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50"
    >
      <p className="text-sm text-gray-700 mb-3 font-semibold">S'abonner à ce calendrier</p>
      <div className="space-y-2">
        <button
          onClick={() => handleSubscribe('Google Calendar')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          Google Calendar
        </button>
        <button
          onClick={() => handleSubscribe('iCal')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          iCal
        </button>
        <button
          onClick={() => handleSubscribe('Outlook')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          Outlook
        </button>
      </div>
    </div>
  );
}
