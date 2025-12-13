import React from "react";
import { Navigation } from "../header";
import { ListeDropdown, MoisDropdown, JourDropdown } from "../dropdowns";
import { DateDisplay } from "../shared";
import { formatDate } from "../utils";
import type { ViewType, AgendaEvent } from "../types";

interface AgendaNavigationProps {
  view: ViewType;
  monthName: string;
  getDateRangeText: () => string;

  activeDropdown: string | null;
  setActiveDropdown: (dropdown: string | null) => void;

  onPrevious: () => void;
  onNext: () => void;

  onGoToToday: () => void;

  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;

  onSelectMonth: (monthIndex: number) => void;
  onSelectYear: (year: number) => void;
  
  events: AgendaEvent[];
}

export default function AgendaNavigation({
  view,
  monthName,
  getDateRangeText,
  activeDropdown,
  setActiveDropdown,
  onPrevious,
  onNext,
  onGoToToday,
  currentMonth,
  selectedDate,
  setSelectedDate,
  onSelectMonth,
  onSelectYear,
  events,
}: AgendaNavigationProps) {
  const primaryBtnLabel = view === "mois" ? "Ce mois-ci" : "Aujourd'hui";

  const dateLabel =
    view === "liste"
      ? getDateRangeText()
      : view === "mois"
        ? monthName
        : formatDate(selectedDate);

  const toggleDropdown = () => {
    setActiveDropdown(activeDropdown === view ? null : view);
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Navigation view={view} onPrevious={onPrevious} onNext={onNext}>
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToToday}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              {primaryBtnLabel}
            </button>

            <div className="relative">
              <DateDisplay text={dateLabel} onClick={toggleDropdown} />

              {activeDropdown === "liste" && (
                <ListeDropdown
                  onSelectDate={setSelectedDate}
                  onClose={() => setActiveDropdown(null)}
                  events={events}
                />
              )}

              {activeDropdown === "mois" && (
                <MoisDropdown
                  currentMonth={currentMonth}
                  onSelectMonth={onSelectMonth}
                  onSelectYear={onSelectYear}
                  onClose={() => setActiveDropdown(null)}
                  events={events}
                />
              )}

              {activeDropdown === "jour" && (
                <JourDropdown
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  onClose={() => setActiveDropdown(null)}
                  events={events}
                />
              )}
            </div>
          </div>
        </Navigation>
      </div>
    </div>
  );
}
