import React, { useState } from "react";
import "./SmallEventCard.scss";
import SingleEventModal from "../../mainComponents/SingleEventModal/SingleEventModal";
import DateFormatforEvent from "../DateFormatforEvent/DateFormatforEvent";

function SmallEventCard({ name, src, attendees, date, event }) {
  const [openEventModal, setOpenEventModal] = useState(false);

  const handleEvent = () => {
    setOpenEventModal(true);
  };

  return (
    <>
      <div className="event-card" onClick={handleEvent}>
        <img src={src} className={src ? "" : "blankImage"} />
        <p className="date">
          <DateFormatforEvent date={date} />
        </p>
        <p className="num">{attendees}</p>
        <p className="name">{`# ${name}`}</p>
      </div>
      {/* {openEventModal && (
        <SingleEventModal
          setOpenEventModal={setOpenEventModal}
          eventTitle={event.title}
          groupId={event.created_by_group_id}
        />
      )} */}
    </>
  );
}

export default SmallEventCard;
