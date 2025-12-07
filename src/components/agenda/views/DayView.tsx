import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AgendaEvent } from '../types';
import { EmptyState, SubscribeButton } from '../shared';
import { DayEventCard } from '../cards';

interface DayViewProps {
  selectedDate: Date;
  dayEvents: AgendaEvent[];
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export default function DayView({ 
  selectedDate, 
  dayEvents, 
  onPreviousDay, 
  onNextDay 
}: DayViewProps) {
  return (
    <div>
      {/* Message vide */}
      {dayEvents.length === 0 && <EmptyState />}

      {/* Boutons de navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onPreviousDay}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Jour précédent
        </button>
        <button
          onClick={onNextDay}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Jour suivant
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Liste des événements */}
      {dayEvents.length > 0 && (
        <div className="space-y-6 mb-8">
          {dayEvents.map((event, idx) => (
            <DayEventCard key={idx} event={event} />
          ))}
        </div>
      )}

      {/* ✅ Utiliser le composant réutilisable */}
      <SubscribeButton />
    </div>
  );
}
