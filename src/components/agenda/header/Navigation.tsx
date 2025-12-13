import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import type { ViewType } from "../types";

interface NavigationProps {
  view: ViewType;
  onPrevious: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

export default function Navigation({
  view,
  onPrevious,
  onNext,
  children,
}: NavigationProps) {
  return (
    <div className="flex items-center gap-4">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Précédent</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Suivant</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {children}
    </div>
  );
}
