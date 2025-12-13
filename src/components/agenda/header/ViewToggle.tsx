import React from "react";
import { Button } from "../../ui/button";
import type { ViewType } from "../types";

interface ViewToggleProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const views: { value: ViewType; label: string }[] = [
    { value: "liste", label: "Liste" },
    { value: "mois", label: "Mois" },
    { value: "jour", label: "Jour" },
  ];

  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      {views.map((v) => (
        <Button
          key={v.value}
          variant={view === v.value ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange(v.value)}
          className={`
            px-4 py-2
            ${view === v.value ? "bg-black text-white" : "text-gray-700"}
          `}
        >
          {v.label}
        </Button>
      ))}
    </div>
  );
}
