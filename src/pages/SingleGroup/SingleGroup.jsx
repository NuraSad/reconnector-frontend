import { useParams, useNavigate } from "react-router-dom";
import "./SingleGroup.scss";
import listAvatars from "../../data/listAvatars.json";
import { useState, useEffect } from "react";
import Btn from "../../components/smallComponents/Btn/Btn";
import BtnList from "../../components/mainComponents/BtnList/BtnList";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SingleGrpModal from "../../components/mainComponents/SingleGrpModal/SingleGrpModal";
import ProfileIcons from "../../components/smallComponents/ProfileIcons/ProfileIcons";
import supabase from "../../config/supabaseClient";
import Tree from "../../assets/tree-loader";

function SingleGroup() {
  const [groups, setGroups] = useState();
  const [fetchError, setFetchError] = useState(null);
  let { id } = useParams();
  let navigate = useNavigate();

  //state for the avatars coming in from the data file which will come in from the database later
  const [usersAvatar] = useState(listAvatars);

  useEffect(() => {
    const fetchGroupId = async (id) => {
      const { data, error } = await supabase
        .from("group")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        setGroups(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetchGroupId(id);
  }, [id]);

  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // const thisGroup = groups.find((el) => el.id === parseInt(id));
  // const tempGroupFind = tempGroup.find((el) => el.id === parseInt(id));
  const [loading, setLoading] = useState(true);

  const handleJoinGrp = () => {
    setOpenModal(true);
  };

  async function goToEvent() {
    //navigate to the page to create an event
    navigate("/createEvent", { state: { groupId: id } });
  }
  useEffect(() => {
    // Loading function to load data or
    // fake it using setTimeout;
    const loadData = async () => {
      // wait for 2 secs if there is no wait
      await new Promise((resolved) => setTimeout(resolved, 2000));
      // set the toggle loading state
      setLoading((loading) => !loading);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If page is in loading state, display
  // loading div which is a spinning circle.
  if (loading) {
    return (
      <div className="loader">
        <Tree />
      </div>
    );
  }
  // If page is not in loading state, display page.
  else {
    return (
      <>
        <section className="singleGroup">
          <h1 className="singleGroup__title">#{groups.name}</h1>
          <div className="singleGroup__header">
            <div className="singleGroup__header--left">
              {/* <div className="singleGroup__header--days">
                <DateItem date={"Mon"} />
                <DateItem date={"Tues"} />
                <DateItem date={"Wed"} />
              </div> */}

              <div className="singleGroup__header--icons">
                <ProfileIcons
                  className="singleGroup__header--days"
                  users={usersAvatar}
                  moveLeft={"-50%"}
                  marginTop={"1rem"}
                />
                <div className="singleGroup__btns">
                  <Btn
                    textBtn={"Join Group +"}
                    bgColor={"#6c3ed696"}
                    textColor={"white"}
                    marginLeft={"10rem"}
                    height={"35px"}
                    onClick={handleJoinGrp}
                  />
                </div>
              </div>
            </div>
            <div className="singleGroup__header--right">
              <Btn
                textBtn={"+ Create Event"}
                bgColor={"#6c3ed696"}
                textColor={"white"}
                marginTop={"1rem"}
                height={"35px"}
                onClick={goToEvent}
              />
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
              <div className="singleGroup__allImage">
                <img
                  className="singleGroup__img"
                  alt="hiking image"
                  src={groups.image}
                />
              </div>

              <div className="singleGroup__descript">{groups.description}</div>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                // eventClick={handleEventClick}
                // eventContent={renderEventContent}
              />
            </div>
            <div className="singleGroup__col-2">
              {/* this is for the list of events */}
              <BtnList groupdId={groups.id} />
            </div>
          </div>
          {openModal && (
            <SingleGrpModal
              setOpenModal={setOpenModal}
              groupId={groups.id}
              groupName={groups.name}
              groupDescription={groups.description}
            />
          )}
        </section>
      </>
    );
  }
}

export default SingleGroup;
