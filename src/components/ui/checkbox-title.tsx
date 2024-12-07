"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className=" font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  );
}
