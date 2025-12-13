import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth } from "../utils";
import type { DayInfo, AgendaEvent } from "../types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListeDropdownProps {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
  events: AgendaEvent[];
}

const MONTHS_FULL = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

export default function ListeDropdown({
  onSelectDate,
  onClose,
  events,
}: ListeDropdownProps) {
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const days = getDaysInMonth(displayMonth, events);

  const currentYear = displayMonth.getFullYear();
  const currentMonth = displayMonth.getMonth();

  // Générer les années (10 ans avant/après)
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const goToPreviousMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayMonth(newDate);
  };

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(parseInt(monthIndex));
    setDisplayMonth(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(displayMonth);
    newDate.setFullYear(parseInt(year));
    setDisplayMonth(newDate);
  };

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-4 z-50">
      {/* Header avec sélecteurs */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousMonth}
          className="h-7 w-7"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-2 flex-1">
          {/* Sélecteur de mois */}
          <Select value={currentMonth.toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-8 text-sm flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS_FULL.map((month, idx) => (
                <SelectItem key={idx} value={idx.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sélecteur d'année */}
          <Select value={currentYear.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="h-8 text-sm w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
          className="h-7 w-7"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* En-tête jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
          <div key={i} className="font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day: DayInfo, idx: number) => {
          const isToday = new Date().toDateString() === day.date.toDateString();
          
          return (
            <Button
              key={idx}
              variant={isToday ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                onSelectDate(day.date);
                onClose();
              }}
              className={`
                h-9 w-9 p-0 relative
                ${!day.isCurrentMonth ? "text-muted-foreground" : ""}
                ${isToday ? "bg-gray-900 hover:bg-gray-800" : ""}
              `}
            >
              {day.day}
              {day.hasEvent && !isToday && (
                <span className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
