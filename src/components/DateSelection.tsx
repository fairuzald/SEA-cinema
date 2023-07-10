import { format, addWeeks, addDays, differenceInDays } from "date-fns";
import Button from "./Button";
import React, { SetStateAction } from "react";

const DateSelection = ({
  selectedDate,
  setSelectedDate,
  length,
}: {
  selectedDate: undefined | Date;
  setSelectedDate: React.Dispatch<SetStateAction<Date | undefined>>;
  length: number;
}) => {
  // Check if a date is selected only check based on day, month, year, and ignore time
  const isDateSelected = (date: Date) => {
    if (!selectedDate) {
      return false;
    }
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
      selectedDay === day && selectedMonth === month && selectedYear === year
    );
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    isDateSelected(date) ? setSelectedDate(undefined) : setSelectedDate(date);
  };

  const today = new Date();

  // Generate date buttons
  const dateButtons = Array.from({ length: length }, (_, index) => {
    const date = addDays(today, index);
    const formattedDate = format(date, "dd MMM");
    const dayOfWeek = format(date, "EEEE");

    return (
      <Button
        key={date.toISOString()}
        color={isDateSelected(date) ? "red" : "gray"}
        onClick={() => handleDateSelect(date)}
      >
        <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
          <p>{formattedDate}</p>
          <p>{dayOfWeek}</p>
        </div>
      </Button>
    );
  });

  return (
    <div className="flex gap-5 overflow-x-scroll w-full py-3">{dateButtons}</div>
  );
};

export default DateSelection;
