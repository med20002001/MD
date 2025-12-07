import React, { useState, useMemo } from 'react';
import { SearchBar, ViewToggle, Navigation } from './header';
import { ListView, MonthView, DayView } from './views';
import { ListeDropdown, MoisDropdown, JourDropdown } from './dropdowns';
import { DateDisplay } from './shared';
import { formatDate, getEventsForDay } from './utils';
import type { AgendaEvent, ViewType } from './types';

interface AgendaContainerProps {
  upcomingEvents?: AgendaEvent[];
  pastEvents?: AgendaEvent[];
  calendarEvents?: AgendaEvent[];
}

const AgendaContainer: React.FC<AgendaContainerProps> = ({
  upcomingEvents = [],
  pastEvents = [],
  calendarEvents = []
}) => {
  const [view, setView] = useState<ViewType>('liste');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredUpcoming = useMemo(() => {
    if (!searchQuery) return upcomingEvents;
    return upcomingEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [upcomingEvents, searchQuery]);

  const filteredPast = useMemo(() => {
    if (!searchQuery) return pastEvents;
    return pastEvents.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pastEvents, searchQuery]);

  const dayEvents = useMemo(() => {
    return getEventsForDay(calendarEvents, selectedDate);
  }, [calendarEvents, selectedDate]);

  const monthName = currentMonth.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric'
  });

  const getDateRangeText = () => {
    if (showAllEvents && filteredPast.length > 0 && filteredUpcoming.length > 0) {
      const oldestEvent = filteredPast[filteredPast.length - 1];
      const newestEvent = filteredUpcoming[filteredUpcoming.length - 1];
      const startDate = new Date(oldestEvent.date).toLocaleDateString('fr-FR', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      const endDate = new Date(newestEvent.date).toLocaleDateString('fr-FR', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      return `${startDate} - ${endDate}`;
    }
    return 'À venir';
  };

  const handlePrevious = () => {
    if (view === 'liste') {
      setShowAllEvents(!showAllEvents);
      if (!showAllEvents) {
        setShowAllPastEvents(true);
      }
    } else if (view === 'jour') {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      setSelectedDate(newDate);
    } else if (view === 'mois') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    }
  };

  const handleNext = () => {
    if (view === 'jour') {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      setSelectedDate(newDate);
    } else if (view === 'mois') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentMonth.getFullYear(), monthIndex, 1);
    setCurrentMonth(newDate);
  };

  const selectYear = (year: number) => {
    const newDate = new Date(year, currentMonth.getMonth(), 1);
    setCurrentMonth(newDate);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearchSubmit = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
            />
            <ViewToggle currentView={view} onViewChange={setView} />
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Navigation
            view={view}
            onPrevious={handlePrevious}
            onNext={handleNext}
          >
            {view === 'liste' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const today = new Date();
                    setSelectedDate(today);
                    setCurrentMonth(today);
                    setShowAllEvents(false);
                    setShowAllPastEvents(false);  // ✅ NE PAS afficher tous les événements passés (seulement 3)
                  }}
                  className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Aujourd'hui
                </button>
                <div className="relative">
                  <DateDisplay
                    text={getDateRangeText()}
                    onClick={() => toggleDropdown('liste')}
                  />
                  {activeDropdown === 'liste' && (
                    <ListeDropdown
                      onSelectDate={setSelectedDate}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </div>
              </div>
            )}

            {view === 'mois' && (
              <div className="relative">
                <DateDisplay
                  text={monthName}
                  onClick={() => toggleDropdown('mois')}
                />
                {activeDropdown === 'mois' && (
                  <MoisDropdown
                    currentMonth={currentMonth}
                    onSelectMonth={selectMonth}
                    onSelectYear={selectYear}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </div>
            )}

            {view === 'jour' && (
              <div className="relative">
                <DateDisplay
                  text={formatDate(selectedDate)}
                  onClick={() => toggleDropdown('jour')}
                />
                {activeDropdown === 'jour' && (
                  <JourDropdown
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </div>
            )}
          </Navigation>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {view === 'liste' && (
          <ListView
            upcomingEvents={filteredUpcoming}
            pastEvents={filteredPast}
            showAllEvents={showAllEvents}
            showAllPastEvents={showAllPastEvents}
            onToggleAllPastEvents={() => setShowAllPastEvents(true)}
          />
        )}

        {view === 'mois' && (
          <MonthView
            currentMonth={currentMonth}
            calendarEvents={calendarEvents}
          />
        )}
        {view === 'jour' && (
          <DayView
            selectedDate={selectedDate}
            dayEvents={dayEvents}
            onPreviousDay={goToPreviousDay}
            onNextDay={goToNextDay}
          />
        )}
      </div>
    </div>
  );
};

export default AgendaContainer;
