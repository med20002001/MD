import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarPlus, ChevronDown, Globe, Apple, Mail, Download } from "lucide-react";

export default function SubscribePopover() {
  const handleClick = (label: string) => {
    alert(label);
  };

  return (
    <Popover>
      {/* ✅ UN SEUL BOUTON = LE TRIGGER */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="
            gap-2
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
          "
        >
          <CalendarPlus className="w-4 h-4" />
          S’abonner au calendrier
          <ChevronDown className="w-4 h-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      {/* ✅ MENU DIRECT */}
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-72 rounded-lg border bg-white p-2 shadow-md"
      >
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
          Ajouter ce calendrier
        </div>

        <MenuItem icon={<Globe className="w-4 h-4" />} label="Google Calendar" onClick={handleClick} />
        <MenuItem icon={<Apple className="w-4 h-4" />} label="Apple Calendar (iCal)" onClick={handleClick} />
        <MenuItem icon={<Mail className="w-4 h-4" />} label="Outlook" onClick={handleClick} />

        <div className="my-2 border-t" />

        <MenuItem icon={<Download className="w-4 h-4" />} label="Exporter .ics" onClick={handleClick} />
        <MenuItem icon={<Download className="w-4 h-4" />} label="Exporter Outlook .ics" onClick={handleClick} />
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: (label: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(label)}
      className="
        flex w-full items-center gap-3
        rounded-md px-3 py-2 text-sm
        hover:bg-muted
        focus:outline-none
        focus-visible:ring-1
        focus-visible:ring-ring
      "
    >
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
