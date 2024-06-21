import React from "react";
import SmallEventCard from "../../smallComponents/SmallEventCard/SmallEventCard";
import "./CardList.scss";

function CardList({ events, title }) {
  return (
    <div className="sidebar">
      <h3>{title}</h3>
      {events &&
        events.map((event) => (
          <SmallEventCard
            key={event.event_id}
            name={event.name}
            src={event.src}
            attendees={event.attendees}
            date={event.date}
          />
        ))}
    </div>
  );
}

export default CardList;
