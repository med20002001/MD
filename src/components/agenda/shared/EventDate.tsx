import React from 'react';

interface EventDateProps {
  month: string;
  day: string;
  year: string;
}

export default function EventDate({ month, day, year }: EventDateProps) {
  return (
    <div className="flex-shrink-0 text-center">
      <div className="bg-gray-100 rounded p-3 w-16">
        <div className="text-xs text-gray-600 uppercase">{month}</div>
        <div className="text-2xl font-bold text-gray-900">{day}</div>
        <div className="text-xs text-gray-600">{year}</div>
      </div>
    </div>
  );
}
