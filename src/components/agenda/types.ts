// Renommer Event en AgendaEvent pour éviter le conflit avec DOM Event
export interface AgendaEvent {
  title: string;
  date: string;
  datetime: string;
  location?: string;
  description: string;
  href: string;
  image?: string;
  month: string;
  day: string;
  year: string;
}

export type ViewType = 'liste' | 'mois' | 'jour';

export interface DayInfo {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
}
