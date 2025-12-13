import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDaysInMonth } from "../utils";
import type { DayInfo, AgendaEvent } from "../types";
import { Button } from "@/components/ui/button";

interface JourDropdownProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
  events: AgendaEvent[]; // ✅ AJOUTÉ
}

export default function JourDropdown({
  selectedDate,
  onSelectDate,
  onClose,
  events, // ✅ AJOUTÉ
}: JourDropdownProps) {
  const [displayMonth, setDisplayMonth] = React.useState(selectedDate);
  const days = getDaysInMonth(displayMonth, events); // ✅ MODIFIÉ

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

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-80 p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="text-sm font-medium capitalize">
          {displayMonth.toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
          <div
            key={i}
            className="font-semibold text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day: DayInfo, idx: number) => {
          const isSelected =
            selectedDate.toDateString() ===
            day.date.toDateString();

          return (
            <Button
              key={idx}
              variant={isSelected ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                onSelectDate(day.date);
                onClose();
              }}
              className={`
                h-9 w-9 p-0 relative
                ${!day.isCurrentMonth ? "text-muted-foreground" : ""}
              `}
            >
              {day.day}
              {day.hasEvent && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full"></span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
