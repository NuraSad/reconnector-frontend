import groupInfo from "../../data/groups.json";
import eventInfo from "../../data/events.json";
import { useParams } from "react-router-dom";
import DateItem from "../../components/smallComponents/DateItem/DateItem";
import "./SingleGroup.scss";
import listAvatars from "../../data/listAvatars.json";
import { useEffect, useState } from "react";
// import ProfileIcons from "../../components/smallComponents/ProfileIcons/ProfileIcons";
import supabase from "../../config/supabaseClient";
import Btn from "../../components/smallComponents/Btn/Btn";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import tempGroupData from "../../data/groups.json";
import Upcoming from "../../components/mainComponents/Upcoming/Upcoming";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
const data = [
  {
    id: 1,
    title: "Meeting",
    start: "2022-10-10T10:00:00",
    end: "2022-10-10T11:00:00",
    allDay: false,
  },
  {
    id: 2,
    title: "Event 1",
    start: "2024-06-01T09:00:00",
    end: "2024-06-01T10:00:00",
    allDay: false,
  },
  {
    id: 3,
    title: "Event 2",
    start: "2024-06-02T14:00:00",
    end: "2024-06-02T15:00:00",
    allDay: false,
  },
  {
    id: 4,
    title: "Event 3",
    start: "2024-06-03T11:30:00",
    end: "2024-06-03T12:30:00",
    allDay: false,
  },
  {
    id: 5,
    title: "Event 4",
    start: "2024-06-04T16:00:00",
    end: "2024-06-04T17:00:00",
    allDay: true,
  },
  {
    id: 6,
    title: "Event 5",
    start: "2024-06-05T13:00:00",
    end: "2024-06-05T14:00:00",
    allDay: false,
  },
  {
    id: 7,
    title: "Event 6",
    start: "2024-06-06T10:30:00",
    end: "2024-06-06T11:30:00",
    allDay: false,
  },
  {
    id: 8,
    title: "Event 7",
    start: "2024-06-07T15:30:00",
    end: "2024-06-07T16:30:00",
    allDay: false,
  },
  {
    id: 9,
    title: "Event 8",
    start: "2024-06-08T12:00:00",
    end: "2024-06-08T13:00:00",
    allDay: false,
  },
  {
    id: 10,
    title: "Event 9",
    start: "2024-06-09T17:30:00",
    end: "2024-06-09T18:30:00",
    allDay: false,
  },
  {
    id: 11,
    title: "Event 10",
    start: "2024-06-10T09:30:00",
    end: "2024-06-10T10:30:00",
    allDay: false,
  },
];

function SingleGroup() {
  const { id } = useParams();
  const [groups, setGroups] = useState(groupInfo);
  const [fetchError, setFetchError] = useState(null);

  const [tempGroup, setTempGroup] = useState(tempGroupData);
  //state for the avatars coming in from the data file which will come in from the database later
  const [usersAvatar] = useState(listAvatars);
  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     const { data, error } = await supabase.from("group").select();

  //     if (error) {
  //       console.log(error);
  //       setFetchError("Could not Fetch the Group");
  //     }
  //     if (data) {
  //       setGroups(data);
  //       setFetchError(null);
  //     }
  //   };
  //   fetchGroups();
  // }, []);
  //pulls in a few parts of information from group (look at database)
  //pulls in the rest from events for the group

  //state for the groups and events
  // const [groups, setGroups] = useState(groupInfo);
  //const [event, setEvents] = useState(eventInfo);
  const [events, setEvents] = useState([]);
  // const [open, setOpen] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  //find the group from the useParams
  const thisGroup = groups.find((el) => el.id === parseInt(id));
  const tempGroupFind = tempGroup.find((el) => el.id === parseInt(id));

  // const handleEventClick = (info) => {
  //   setSelectedEvent(info.event);
  //   setOpen(true);
  // };

  return (
    <>
      {fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <section className="singleGroup">
          <h1 className="singleGroup__title">#{thisGroup.title}</h1>
          <div className="singleGroup__header">
            <div className="singleGroup__header--left">
              <div className="singleGroup__header--days">
                <DateItem date={"Mon"} />
                <DateItem date={"Tues"} />
                <DateItem date={"Wed"} />
              </div>
              {/* <ProfileIcons
                className="singleGroup__header--days"
                users={usersAvatar}
                // moveBottom={"50%"}
                moveLeft={"-50%"}
                marginTop={"1rem"}
              /> */}
              <div className="singleGroup__header--icons">
                <AvatarGroup max={4}>
                  {usersAvatar.map((each) => (
                    <Avatar key={each.id} alt={each.name} src={each.src} />
                  ))}
                </AvatarGroup>
                <Btn
                  textBtn={"Join Group +"}
                  bgColor={"#6c3ed696"}
                  textColor={"white"}
                  marginLeft={"2rem"}
                  height={"35px"}
                />
              </div>
            </div>
            <div className="singleGroup__header--right">
              <Btn
                textBtn={"In-person"}
                bgColor={"#D9D9D9"}
                textColor={"white"}
                marginTop={"1rem"}
                height={"35px"}
              />
              <Btn
                textBtn={"Vancouver"}
                bgColor={"#D9D9D9"}
                textColor={"white"}
                marginTop={"1rem"}
                height={"35px"}
              />
            </div>
          </div>
          <div className="singleGroup__columns">
            <div className="singleGroup__col-1">
              <div className="singleGroup__col-1--images">
                {tempGroupFind && tempGroupFind.groupImage > 0 ? (
                  tempGroupFind.groupImage.map((index, img) => (
                    <img key={index} alt={`${img}`} src={img} />
                  ))
                ) : (
                  <div className="singleGroup__allImage">
                    <div className="singleGroup__allImage--col-1">
                      <img
                        className="singleGroup__img"
                        alt="hiking image"
                        src={thisGroup.image}
                      />
                    </div>
                    <div className="singleGroup__allImage--col-2">
                      <img
                        className="singleGroup__img sec--1"
                        alt="hiking image"
                        src={thisGroup.image}
                      />
                      <img
                        className="singleGroup__img sec--2"
                        alt="hiking image"
                        src={thisGroup.image}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="singleGroup__descript">
                {thisGroup.description}
              </div>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                // eventClick={handleEventClick}
                // eventContent={renderEventContent}
              />
            </div>
            <div className="singleGroup__col-2">
              <Upcoming groupdId={thisGroup.id} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

export default SingleGroup;
