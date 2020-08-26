import moment from "moment";
import React, { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState({
    dateData: moment()
  });
  const weekdays = moment.weekdays();
  // Return one TH by day
  let weekdaysShortName = weekdays.map(day => {
    return (
      <th key={day} className="week-day">
        {day}
      </th>
    );
  });
  // Return the first day of the month (0: sun -> 6: sat)
  const firstDayOfTheMonth = () => {
    let dateEnv = date.dateData;
    let firstDay = moment(dateEnv)
      .startOf("month")
      .format("d");
    return firstDay;
  };

  // Create a blank area before filling the first date of the month
  let blanks = [];
  for (let i = 0; i < firstDayOfTheMonth(); i++) {
    blanks.push(
      <td key={i * 80} className="emptySlot">
        {""}
      </td>
    );
  }
  // Number of days in the month
  const DaysInMonth = () => {
    return date.dateData.daysInMonth();
  };
  // Return a TD for each day in the month
  let daysInMonth = [];
  for (let d = 1; d <= DaysInMonth(); d++) {
    daysInMonth.push(
      <td key={d} className="calendar-day">
        {d}
      </td>
    );
  }

  var totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d, i) => {
    return <tr key={i}>{d}</tr>;
  });

  return (
    <div>
      <h2>Calendar</h2>
      <table className="calendar">
        <thead>
          <tr>{weekdaysShortName}</tr>
        </thead>
        <tbody>{daysinmonth}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
