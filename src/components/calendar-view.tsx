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

// const year = {
//   January: 31,
//   February: 28,
//   March: 31,
//   April: 30,
//   May: 31,
//   June: 30,
//   July: 31,
//   August: 31,
//   September: 30,
//   October: 31,
//   November: 30,
//   December: 31,
// };

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
  console.log(daysList);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselContent>
        {daysList.map(({ day, dayName }) => (
          <CarouselItem key={day} className={` md:basis-1/2 lg:basis-1/5`}>
            <div className="p-1">
              <Card
                onClick={() => {
                  setSelectedDay(day);
                }}
                className={` transition duration-300 hover:cursor-pointer ${
                  day === selectedDay ? "bg-zinc-900 text-white" : ""
                } `}
              >
                <CardContent className="flex items-center justify-center p-6">
                  <div className={`text-3xl font-semibold `}>
                    {dayName},{day}
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
