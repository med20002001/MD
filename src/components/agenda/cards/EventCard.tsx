import React from 'react';
import type { AgendaEvent } from '../types';
import { EventDate } from '../shared';

interface EventCardProps {
  event: AgendaEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="mb-6 border-b pb-6">
      <div className="flex gap-6">
        <EventDate month={event.month} day={event.day} year={event.year} />
        <div className="flex-1">
          <div className="text-sm text-gray-600 mb-1">{event.datetime}</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            <a href={event.href} className="hover:text-red-600">
              {event.title}
            </a>
          </h3>
          <div className="text-sm text-gray-700 mb-2">{event.location}</div>
          <p className="text-gray-600">{event.description}</p>
        </div>
        {event.image && (
          <div className="flex-shrink-0 w-48 h-32">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
