import React from "react";
import "./SmallEventCard.scss";

function SmallEventCard({ name, src, attendees, date }) {
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

  const day = dateTime.getDay();
  const hours = String(dateTime.getHours());
  let minutes = String(dateTime.getMinutes());
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  const timeString = `${daysOfWeek[dateTime.getDay()]} ${day} ${
    months[dateTime.getMonth()]
  } @${hours}:${minutes}`;
  return (
    <div className="event-card">
      <img src={src} className={src ? "" : "blankImage"} />

      <p className="date">{timeString}</p>
      <p className="num">{attendees}</p>
      <p className="name">{`# ${name}`}</p>
    </div>
  );
}

export default SmallEventCard;
