import React from "react";

const DateFormatforEvent = ({ date }) => {
  const dateTimeString = date;
  const dateTime = new Date(dateTimeString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(dateTime.getDate());
  const hours = String(dateTime.getHours());
  let minutes = String(dateTime.getMinutes());
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const timeString = `${daysOfWeek[dateTime.getDay()]} ${day} ${
    months[dateTime.getMonth()]
  } @${hours}:${minutes}`;
  return <span>{timeString}</span>;
};

export default DateFormatforEvent;
