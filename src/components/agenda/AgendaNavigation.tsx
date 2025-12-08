// File: AgendaNavigation.tsx
import React, { useState } from 'react';
import { Navigation } from './header';
import DateSelectors from './DateSelectors';
import type { ViewType } from '././types';


interface NavProps {
view: ViewType;
selectedDate: Date;
currentMonth: Date;
showAllEvents: boolean;
onToggleAllPast: () => void;
onNavAction: Record<string, () => void>;
onDateSelect: (d: Date) => void;
onMonthSelect: (m: number) => void;
onYearSelect: (y: number) => void;
}


const AgendaNavigation: React.FC<NavProps> = props => {
const [activeDropdown, setActiveDropdown] = useState<string | null>(null);


const toggle = (key: string) => setActiveDropdown(prev => (prev === key ? null : key));


return (
<div className="bg-white border-b">
<div className="max-w-6xl mx-auto px-4 py-4">
<Navigation view={props.view} onPrevious={props.onNavAction[props.view === 'liste' ? 'liste' : props.view + 'Prev']} onNext={props.onNavAction[props.view === 'jour' ? 'jourNext' : 'moisNext']}>
<DateSelectors {...props} activeDropdown={activeDropdown} toggleDropdown={toggle} />
</Navigation>
</div>
</div>
);
};


export default AgendaNavigation;