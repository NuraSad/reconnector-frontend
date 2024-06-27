import React, { useEffect, useState } from "react";
import SmallEventCard from "../../smallComponents/SmallEventCard/SmallEventCard";
import "./CardList.scss";

function CardList({ events, title }) {
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    const today = new Date();
    const upcomingEvents = events.filter(
      (e) => new Date(e.event_date) >= today
    );
    setFilteredEvents(upcomingEvents);
  }, []);
  return (
    <div className="sidebar">
      <h3>{title}</h3>
      {filteredEvents &&
        filteredEvents
          .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
          .slice(0, 3)
          .map((event) => (
            <SmallEventCard
              key={event.id}
              name={event.title}
              src={event.event_image}
              attendees={event.NumberOfParticipants}
              date={event.event_date}
              event={event}
            />
          ))}
    </div>
  );
}

export default CardList;
