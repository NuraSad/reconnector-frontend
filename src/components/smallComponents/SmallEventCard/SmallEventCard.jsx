import React from "react";
import "./SmallEventCard.scss";

function SmallEventCard({ name, src, attendees, date }) {
  return (
    <div className="event-card">
      <img src={src} alt={name} />
      <p className="date">{date}</p>
      <p className="num">{attendees}</p>
      <p className="name">{`# ${name}`}</p>
    </div>
  );
}

export default SmallEventCard;
