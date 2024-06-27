import './Calendar.scss';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import supabase from '../../config/supabaseClient';
import { getUserId } from '../../userUtils';
import SingleEventModal from '../../components/mainComponents/SingleEventModal/SingleEventModal';



  const Calendar = () => {
    const [mapEvents, setMapEvents] = useState([]);
    const [openEventModal, setOpenEventModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [dataEvents, setDataEvents] = useState([]);


    useEffect(() => {
        const fetchDates = async () => {
          const userId = await getUserId();
          const { data: participants, error } = await supabase.from("event_participants")
          .select().eq("user_id", userId);
          const { data: dataEvents, error: eventError } = await supabase.from('event')
          .select().in('id', participants?.map((event) => event.event_id));
          console.log(dataEvents);
          setDataEvents(dataEvents);
          
          const data = dataEvents.map((event) => {
            return {
              id: event.id,
              title: event.title,
              date:event.event_date,
              allDay: false
            };
          });
          
          setMapEvents(data);
        };
        fetchDates();
    }, []);
  
    const handleEventClick = (info) => {
      const publicId = info.event._def.publicId;
      const event = dataEvents.find((event) => event.id.toString() === publicId);
      setOpenEventModal(!openEventModal);
      setModalData(event);
    };

  
    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={mapEvents}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
        {openEventModal &&
          <SingleEventModal
            setOpenEventModal={openEventModal}
            eventTitle={modalData?.title}
            eventDescription={modalData?.description}
            online={modalData?.online}
          />
        }
      </>
    );
  };

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}

const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const options = { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true 
    };
    return date.toLocaleDateString('en-US', options);
};

export default Calendar;