import React from 'react';
import type { AgendaEvent } from '../types';

interface DayEventCardProps {
  event: AgendaEvent;
}

export default function DayEventCard({ event }: DayEventCardProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="text-sm text-gray-600 mb-2">{event.datetime}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        <a href={event.href} className="hover:text-blue-600">
          {event.title}
        </a>
      </h3>
      <div className="text-gray-700 mb-2">{event.location}</div>
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
}
