import React from 'react';
import { getDaysInMonth } from '../utils';
import type { DayInfo } from '../types';


interface ListeDropdownProps {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export default function ListeDropdown({ onSelectDate, onClose }: ListeDropdownProps) {
  const days = getDaysInMonth(new Date());
  
  return (
    <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 w-64">
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div key={i} className="font-semibold text-gray-600">{day}</div>
        ))}
      </div>
      <div className="text-center mb-2">
        <button className="text-sm font-medium">décembre 2025</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day: DayInfo, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              onSelectDate(day.date);
              onClose();
            }}
            className={`p-1 text-sm rounded ${
              !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
            } ${
              new Date().toDateString() === day.date.toDateString()
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  );
}
