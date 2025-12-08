import React from 'react';
import { SearchBar, ViewToggle } from '../header';
import type { ViewType } from '../../types';


interface Props {
searchQuery: string;
onSearchChange: (q: string) => void;
onSearchSubmit: () => void;
view: ViewType;
onViewChange: (v: ViewType) => void;
}


const AgendaHeader: React.FC<Props> = ({ searchQuery, onSearchChange, onSearchSubmit, view, onViewChange }) => (
<div className="bg-white border-b">
<div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
<SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit} />
<ViewToggle currentView={view} onViewChange={onViewChange} />
</div>
</div>
);


export default AgendaHeader;