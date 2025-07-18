"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

type ComboboxProps = {
  name: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
};

export function ComboBox({ name, options, value, onChange }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const formattedOptions = options.map((option) => ({
    value: option.toLowerCase().replace(/\s+/g, "-"),
    label: option,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between rounded-lg border-none bg-transparent px-2
            font-[system-ui] font-normal text-gray-600 shadow-none only-hover:bg-black/10
            only-hover:text-gray-600 dark:text-[#c5cbd0] dark:only-hover:bg-white/10
            dark:only-hover:text-[#c5cbd0]"
        >
          {formattedOptions.find((option) => option.value === value)?.label}
          <ChevronsUpDown className="w-[16px] text-gray-600 opacity-50 dark:text-[#c5cbd0]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] border-none p-0">
        <Command className="shadow-long dark:bg-[#454545]">
          <CommandInput
            placeholder={`Search ${name}...`}
            className="h-9 placeholder:font-[system-ui]"
          />
          <CommandList>
            <CommandEmpty>No ${name} found.</CommandEmpty>
            <CommandGroup>
              {formattedOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  className="font-[system-ui] text-gray-600 only-hover:bg-black/10 dark:text-[#c5cbd0]
                    dark:only-hover:bg-white/10"
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
