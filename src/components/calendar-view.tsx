"use client";
import dayjs from "dayjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useDayStore } from "@/stores/todo";

const daysInCurrentMonth = dayjs().daysInMonth();

const CalendarView = () => {
  return (
    <div className="h-36 flex w-full px-16 items-center justify-center bg-white">
      <DateCarousel />
    </div>
  );
};

export default CalendarView;

export function DateCarousel() {
  const { selectedDay, setSelectedDay } = useDayStore();
  // const currentDay = dayjs().date;
  const daysList = Array.from({ length: daysInCurrentMonth }, (_, index) => ({
    day: index + 1,
    dayName: dayjs()
      .date(index + 1)
      .format("ddd"),
  }));

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  "
    >
      <CarouselContent>
        {daysList.map(({ day, dayName }) => (
          <CarouselItem
            key={day}
            className={`max-sm:basis-1/3  md:basis-1/4 lg:basis-1/5 `}
          >
            <div className="p-1">
              <Card
                onClick={() => {
                  setSelectedDay(day);
                }}
                className={` transition max-sm:w-16 duration-300 hover:cursor-pointer ${
                  day === selectedDay ? "bg-zinc-900 text-white" : ""
                } `}
              >
                <CardContent className="flex items-center justify-center p-6">
                  <div
                    className={`text-3xl max-sm:text-lg font-semibold text-center `}
                  >
                    {dayName}
                    <div>{day}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
