import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth } from '../utils';
import type { DayInfo } from '../types';

interface JourDropdownProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export default function JourDropdown({ selectedDate, onSelectDate, onClose }: JourDropdownProps) {
  const [displayMonth, setDisplayMonth] = React.useState(selectedDate);
  const days = getDaysInMonth(displayMonth);
  
  const goToPreviousMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayMonth(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayMonth(newDate);
  };
  
  return (
    <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50 w-80">
      <div className="flex items-center justify-between mb-3">
        <button onClick={goToPreviousMonth}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-medium">
          {displayMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={goToNextMonth}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div key={i} className="font-semibold text-gray-600">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day: DayInfo, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              onSelectDate(day.date);
              onClose();
            }}
            className={`p-2 text-sm rounded ${
              !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
            } ${
              selectedDate.toDateString() === day.date.toDateString()
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
