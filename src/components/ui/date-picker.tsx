"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Todo, useTodoStore } from "@/stores/todo";
import { ActionType } from "../update-todo";
import { db } from "@/db/db";

export function DatePickerWithPresets({
  action,
  currTodo,
}: {
  action: ActionType;
  currTodo?: Todo;
}) {
  const { setAssignedDate } = useTodoStore();
  const [date, setDate] = React.useState<Date>();

  const handleDateSelection = (selectedDate: Date) => {
    if (action === "add") {
      setDate(selectedDate);
      setAssignedDate(selectedDate === null ? new Date() : selectedDate);
    }
    if (action === "update") {
      setDate(selectedDate);
      if (currTodo) {
        db.todos.update(currTodo.id, {
          assignedDate: selectedDate,
        });
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          defaultValue={currTodo?.status}
          onValueChange={(value) => {
            const newDate = addDays(new Date(), parseInt(value));
            handleDateSelection(newDate);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
              if (day) {
                handleDateSelection(day);
              }
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
