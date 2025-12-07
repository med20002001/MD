import React from 'react';
import type { AgendaEvent } from '../types';
import { EmptyState, SubscribeButton } from '../shared';
import { getDaysInMonth, getEventsForDay, WEEK_DAYS } from '../utils';

interface MonthViewProps {
  currentMonth: Date;
  calendarEvents: AgendaEvent[];
}

export default function MonthView({ currentMonth, calendarEvents }: MonthViewProps) {
  const days = getDaysInMonth(currentMonth);
  
  return (
    <div>
      {calendarEvents.length === 0 && <EmptyState />}

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-7 border-b bg-gray-50">
          {WEEK_DAYS.map((day) => (
            <div key={day} className="p-3 text-center text-xs font-semibold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const dayEvents = getEventsForDay(calendarEvents, day.date);
            const isToday = new Date().toDateString() === day.date.toDateString();
            
            return (
              <div
                key={idx}
                className={`min-h-[100px] border-r border-b p-2 ${
                  !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                } ${isToday ? 'text-blue-600 font-bold' : ''}`}>
                  {day.day}
                </div>
                {dayEvents.map((event, i) => (
                  <a
                    key={i}
                    href={event.href}
                    className="block text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1 hover:bg-blue-200 truncate"
                  >
                    {event.title}
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Utiliser le composant réutilisable */}
      <SubscribeButton />
    </div>
  );
}
