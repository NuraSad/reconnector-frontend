import "./Calendar.scss";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import supabase from "../../config/supabaseClient";
import { getUserId } from "../../userUtils";
import SingleEventModal from "../../components/mainComponents/SingleEventModal/SingleEventModal";
import DateFormatforEvent from "../../components/smallComponents/DateFormatforEvent/DateFormatforEvent";

const Calendar = () => {
  const [mapEvents, setMapEvents] = useState([]);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [dataEvents, setDataEvents] = useState([]);
  const [fetchError, setFetchError] = useState("");
  useEffect(() => {
    const fetchDates = async () => {
      const userId = await getUserId();
      const { data: participants, error } = await supabase
        .from("event_participants")
        .select()
        .eq("user_id", userId);
      const { data: dataEvents, error: eventError } = await supabase
        .from("event")
        .select()
        .in(
          "id",
          participants?.map((event) => event.event_id)
        );

      setDataEvents(dataEvents);
    };
    // const fetchDates1 = async () => {
    //   const { data: events, error } = await supabase.from("event").select();
    //   if (error) {
    //     setFetchError("Could not fetch the events from the Calendar");
    //     return;
    //   }
    //   setDataEvents(events);
    // };
    fetchDates();
  }, []);

  useEffect(() => {
    const eventData = dataEvents.map((i) => {
      return {
        id: i.id,
        title: i.title,
        start: new Date(i.event_date).toISOString(),
        allDay: false,
      };
    });
    // console.log(eventData)
    setMapEvents(eventData);
  }, [dataEvents]);

  const handleEventClick = (info) => {
    const publicId = info.event._def.publicId;
    const event = dataEvents.find((event) => event.id.toString() === publicId);
    setOpenEventModal(!openEventModal);
    setModalData(event);
  };

  return fetchError ? (
    <>{fetchError}</>
  ) : (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={mapEvents}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: "short",
        }} // Customize time format
        dayHeaderFormat={{ weekday: "long" }} // Customize day header format
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        height="90vh"
      />
      {openEventModal && (
        <SingleEventModal
          setOpenEventModal={setOpenEventModal}
          eventTitle={modalData.title}
          groupId={modalData.created_by_group_id}
        />
      )}
    </>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
};

export default Calendar;
