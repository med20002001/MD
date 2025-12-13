import React from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Rechercher événements"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Button onClick={onSearchSubmit}>
        Chercher
      </Button>
    </div>
  );
}
