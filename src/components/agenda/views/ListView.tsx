import React from 'react';
import type { AgendaEvent } from '../types';  
import { EventCard } from '../cards';
import { EmptyState, Button } from '../shared';

interface ListViewProps {
  upcomingEvents: AgendaEvent[];
  pastEvents: AgendaEvent[];
  showAllEvents: boolean;
  showAllPastEvents: boolean;
  onToggleAllPastEvents: () => void;
}

export default function ListView({
  upcomingEvents,
  pastEvents,
  showAllEvents,
  showAllPastEvents,
  onToggleAllPastEvents
}: ListViewProps) {
  const displayedPastEvents = showAllPastEvents ? pastEvents : pastEvents.slice(0, 3);
  
  return (
    <div>
      {showAllEvents && pastEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements passés</h2>
          {pastEvents.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      )}

      {upcomingEvents.length === 0 && !showAllEvents && (
        <EmptyState />
      )}

      {upcomingEvents.length > 0 && (
        <div className="mb-12">
          {showAllEvents && <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements à venir</h2>}
          {upcomingEvents.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      )}

      {!showAllEvents && pastEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers Événements passés</h2>
          {displayedPastEvents.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
          
          {pastEvents.length > 3 && !showAllPastEvents && (
            <Button 
              variant="secondary"
              onClick={onToggleAllPastEvents}
              className="mt-4"
            >
              Voir tous les événements passés ({pastEvents.length})
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
