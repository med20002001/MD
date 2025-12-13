import * as React from "react";
import { MONTHS } from "../utils";
import { Button } from "@/components/ui/button";
import type { AgendaEvent } from "../types";

interface MoisDropdownProps {
  currentMonth: Date;
  onSelectMonth: (monthIndex: number) => void;
  onSelectYear: (year: number) => void;
  onClose: () => void;
  events: AgendaEvent[]; // ✅ AJOUTÉ
}

export default function MoisDropdown({
  currentMonth,
  onSelectMonth,
  onSelectYear,
  onClose,
  events, // ✅ AJOUTÉ
}: MoisDropdownProps) {
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 p-4 z-50">
      <div className="mb-3 text-center text-sm font-semibold">
        {currentYear}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {MONTHS.map((month, idx) => {
          const isActive = currentMonth.getMonth() === idx;
          const hasEvents = events.some(e => 
            e.date.getFullYear() === currentYear && 
            e.date.getMonth() === idx
          );

          return (
            <Button
              key={idx}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className="justify-center relative"
              onClick={() => {
                onSelectMonth(idx);
                onClose();
              }}
            >
              {month}
              {hasEvents && !isActive && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              )}
            </Button>
          );
        })}
      </div>

      <div className="my-3 border-t" />

      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => {
          const isActive = year === currentYear;

          return (
            <Button
              key={year}
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                onSelectYear(year);
                onClose();
              }}
            >
              {year}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
