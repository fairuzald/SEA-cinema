import { format, addWeeks, startOfWeek, addDays, isDate } from "date-fns";
import Button from "./Button";
import React, { SetStateAction } from "react";

const DateSelection = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: undefined | Date;
  setSelectedDate: React.Dispatch<SetStateAction<Date | undefined>>;
}) => {

  const isDateSelected = (date: Date) => {
    return selectedDate && selectedDate.toISOString() === date.toISOString();
  };
  const handleDateSelect = (date: Date) => {
    isDateSelected(date) ? setSelectedDate(undefined) : setSelectedDate(date);
  };

  const today = new Date();
  const endDate = addWeeks(today, 4);
  let currentDate = startOfWeek(today);

  const dateButtons = Array.from({ length: 28 }, (_, index) => {
    const date = addDays(currentDate, index);
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
    <div className="flex gap-5 overflow-x-scroll w-full">{dateButtons}</div>
  );
};

export default DateSelection;
