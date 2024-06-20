import './Calendar.scss';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Modal, Box } from '@mui/material';

const data = [
    {
        id: 1,
        title: 'Meeting',
        start: '2022-10-10T10:00:00',
        end: '2022-10-10T11:00:00',
        allDay: false
    },
    {
        id: 2,
        title: 'Event 1',
        start: '2024-06-01T09:00:00',
        end: '2024-06-01T10:00:00',
        allDay: false
    },
    {
        id: 3,
        title: 'Event 2',
        start: '2024-06-02T14:00:00',
        end: '2024-06-02T15:00:00',
        allDay: false
    },
    {
        id: 4,
        title: 'Event 3',
        start: '2024-06-03T11:30:00',
        end: '2024-06-03T12:30:00',
        allDay: false
    },
    {
        id: 5,
        title: 'Event 4',
        start: '2024-06-04T16:00:00',
        end: '2024-06-04T17:00:00',
        allDay: true
    },
    {
        id: 6,
        title: 'Event 5',
        start: '2024-06-05T13:00:00',
        end: '2024-06-05T14:00:00',
        allDay: false
    },
    {
        id: 7,
        title: 'Event 6',
        start: '2024-06-06T10:30:00',
        end: '2024-06-06T11:30:00',
        allDay: false
    },
    {
        id: 8,
        title: 'Event 7',
        start: '2024-06-07T15:30:00',
        end: '2024-06-07T16:30:00',
        allDay: false
    },
    {
        id: 9,
        title: 'Event 8',
        start: '2024-06-08T12:00:00',
        end: '2024-06-08T13:00:00',
        allDay: false
    },
    {
        id: 10,
        title: 'Event 9',
        start: '2024-06-09T17:30:00',
        end: '2024-06-09T18:30:00',
        allDay: false
    },
    {
        id: 11,
        title: 'Event 10',
        start: '2024-06-10T09:30:00',
        end: '2024-06-10T10:30:00',
        allDay: false
    }
]

const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };


  const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
  
    useEffect(() => {
        setEvents(data);
        const fetchDates = async () => {
        // const { data, error } = await supabase.from('calender').select();
        };
    }, []);
  
    const handleEventClick = (info) => {
      setSelectedEvent(info.event);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedEvent(null);
    };
  
    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
        eventContent={renderEventContent}
        />
        <Modal
          open={open}
           onClose={handleClose}
          aria-labelledby="event-modal-title"
          aria-describedby="event-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 5,
              boxShadow: 24,
              p: 10,
            }}
          >
            {selectedEvent && (
              <>
                  <h3>{selectedEvent.title}</h3>
                  <p>Start: {formatDateTime(selectedEvent.start)}</p>
                  <p>End: {selectedEvent.end ? formatDateTime(selectedEvent.end) : 'N/A'}</p>
                  <button onClick={handleClose}>Close Modal</button>
              </>
            )}
          </Box>
        </Modal>
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