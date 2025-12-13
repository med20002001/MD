import React from 'react';
import { Calendar } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "Il n'y a pas de événements." }: EmptyStateProps) {
  return (
    <div className="bg-gray-100 rounded p-6 mb-6 flex items-center justify-center gap-2">
      <Calendar className="w-5 h-5 text-gray-600" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
