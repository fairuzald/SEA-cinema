import {
  format,
  addWeeks,
  startOfWeek,
  addDays,
  isDate,
  differenceInDays,
} from "date-fns";
import Button from "./Button";
import React, { SetStateAction } from "react";

const DateSelection = ({
  selectedDate,
  setSelectedDate,
  releaseDate,
}: {
  selectedDate: undefined | Date;
  setSelectedDate: React.Dispatch<SetStateAction<Date | undefined>>;
  releaseDate: Date;
}) => {
  const isDateSelected = (date: Date) => {
    return selectedDate && selectedDate.toISOString() === date.toISOString();
  };
  const handleDateSelect = (date: Date) => {
    isDateSelected(date) ? setSelectedDate(undefined) : setSelectedDate(date);
  };

  const today = new Date();
  const endDate = addWeeks(releaseDate, 4);
  const lengthDate = differenceInDays(endDate, today);
  let currentDate = startOfWeek(today);

  const dateButtons = Array.from({ length: lengthDate }, (_, index) => {
    const date = addDays(currentDate, index);
    const formattedDate = format(date, "dd MMM");
    const dayOfWeek = format(date, "EEEE");

    return (
      <Button
        key={date.toISOString()}
        color={isDateSelected(date) ? "red" : "gray"}
        onClick={() => handleDateSelect(date)}
        disabled={date.getTime() < new Date().getTime() - 1000 * 60 * 12}
      >
        <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
          <p>{formattedDate}</p>
          <p>{dayOfWeek}</p>
        </div>
      </Button>
    );
  });

  return (
    <div className="flex gap-5 overflow-x-scroll w-full">
      {lengthDate > 0 ? (
        dateButtons
      ) : (
        <p className="text-red text-xl font-bold w-full items-center justify-center text-center">
          Expired
        </p>
      )}
    </div>
  );
};

export default DateSelection;
