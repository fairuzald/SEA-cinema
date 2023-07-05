"use client";
import Button from "@/components/Button";
import React, { SetStateAction } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Calendar = ({
  value,
  disabledDates,
  onChange,
  setIsCalendarOpen,
}: {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
  setIsCalendarOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full flex-col flex">
      <DateRange
        rangeColors={["#FF0000"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
        className="text-xl font-bold"
      />
      <Button color="red" onClick={() => setIsCalendarOpen(false)}>
        Submit
      </Button>
    </div>
  );
};

export default Calendar;
