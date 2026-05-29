"use client";

import { Button } from "@/components/ui/button";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

const categories = ["All Categories", "Excavators", "Loaders", "Forklifts", "Cranes", "Trucks", "Generators", "Agricultural"];
const types = ["All Types", "New", "Used", "Refurbished", "For Parts"];
const locations = ["All Locations", "Serbia", "Croatia", "Bosnia", "Montenegro", "North Macedonia", "Slovenia", "Bulgaria", "Romania"];
const priceRanges = ["Any Price", "Under €10,000", "€10,000 – €50,000", "€50,000 – €100,000", "€100,000 – €250,000", "Over €250,000"];

interface SelectFieldProps {
  label: string;
  options: string[];
}

function SelectField({ label, options }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none bg-[hsl(0_0%_18%)] border border-[hsl(0_0%_25%)] rounded-[var(--radius)] px-3 py-2.5 pr-8 text-sm text-[hsl(0_0%_78%)] focus:outline-none focus:border-[hsl(38_96%_50%)] cursor-pointer"
        defaultValue={options[0]}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(0_0%_54%)] pointer-events-none" />
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="relative z-20 -mt-6 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <div className="bg-[hsl(0_0%_14%)] border border-[hsl(0_0%_25%)] rounded-lg p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          {/* Keyword search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(0_0%_54%)]" />
            <input
              type="text"
              placeholder="Search equipment..."
              className="w-full bg-[hsl(0_0%_18%)] border border-[hsl(0_0%_25%)] rounded-[var(--radius)] pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-[hsl(0_0%_54%)] focus:outline-none focus:border-[hsl(38_96%_50%)]"
            />
          </div>

          {/* Dropdown filters */}
          <SelectField label="Category" options={categories} />
          <SelectField label="Type" options={types} />
          <SelectField label="Location" options={locations} />
          <SelectField label="Price" options={priceRanges} />

          {/* Search button */}
          <Button variant="default" size="full" className="lg:w-auto lg:px-8 shrink-0">
            <Search className="h-4 w-4 mr-1.5" />
            Search
          </Button>
        </div>

        {/* Advanced search link */}
        <div className="mt-3 flex justify-end">
          <button className="flex items-center gap-1.5 text-xs text-[hsl(0_0%_54%)] hover:text-[hsl(38_96%_50%)] transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Advanced Search
          </button>
        </div>
      </div>
    </div>
  );
}
