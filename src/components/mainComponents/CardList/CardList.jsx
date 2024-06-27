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
            key={event.id}
            name={event.title}
            src={event.event_image}
            attendees={event.
              NumberOfParticipants}
            date={event.event_date}
            event={event}
          />
        ))}
    </div>
  );
}

export default CardList;
