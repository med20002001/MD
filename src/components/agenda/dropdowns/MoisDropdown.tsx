import React from 'react';
import { MONTHS } from '../utils';

interface MoisDropdownProps {
  currentMonth: Date;
  onSelectMonth: (monthIndex: number) => void;
  onSelectYear: (year: number) => void;
  onClose: () => void;
}

export default function MoisDropdown({ 
  currentMonth, 
  onSelectMonth, 
  onSelectYear, 
  onClose 
}: MoisDropdownProps) {
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - 2 + i);
  
  return (
    <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50">
      <div className="text-center mb-3 font-bold">{currentYear}</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {MONTHS.map((month, idx) => (
          <button
            key={idx}
            onClick={() => {
              onSelectMonth(idx);
              onClose();
            }}
            className={`px-3 py-2 text-sm rounded ${
              currentMonth.getMonth() === idx
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
      <div className="border-t pt-3">
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                onSelectYear(year);
                onClose();
              }}
              className={`px-3 py-2 text-sm rounded ${
                currentYear === year
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
