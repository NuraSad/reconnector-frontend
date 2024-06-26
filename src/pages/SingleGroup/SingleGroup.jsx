import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./SingleGroup.scss";
import listAvatars from "../../data/listAvatars.json";
import { useState, useEffect } from "react";
import Btn from "../../components/smallComponents/Btn/Btn";
import BtnList from "../../components/mainComponents/BtnList/BtnList";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProfileIcons from "../../components/smallComponents/ProfileIcons/ProfileIcons";
import supabase from "../../config/supabaseClient";
import Tree from "../../assets/tree-loader";
import SingleEventModal from "../../components/mainComponents/SingleEventModal/SingleEventModal";
import { getUserId } from "../../userUtils.js";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

function SingleGroup() {
  const [groups, setGroups] = useState();
  const [fetchError, setFetchError] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);

  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  let navigate = useNavigate();
  // const [usersAvatar] = useState(listAvatars);
  const [joinGroup, setJoinGroup] = useState(false);

  // const location = useLocation();
  // const { groupMembers } = location.state;
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
        setFetchError(null);
      }
    };
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("event")
        .select("*")
        .eq("created_by_group_id", id);

      if (error) {
        setFetchError("Could not Fetch the Event");
      } else {
        setEvents(data);
    
        setFetchError("");
      }
    };
    fetchGroupId(id);
    fetchEvent();
  }, [id]);

  //query the users in this group
  useEffect(() => {
    const fetchGroupMembers = async () => {
      const groupId = id;
      if (!id) {
        setFetchError("No group ID provided");
        return;
      }
      const { data: groupMembersData, error: groupMembersError } =
        await supabase
          .from("group_members")
          .select("user_id")
          .eq("group_id", groupId);
   
      if (groupMembersError) {
        setFetchError("Could not fetch the group members");
        return;
      }

      if (groupMembersData) {
        // Extract user_ids
        const userIds = groupMembersData.map((member) => member.user_id);
        console.log(userIds);
        // Fetch user details from users table
        const { data: usersData, error: usersError } = await supabase
          .from("user")
          .select("first_name, avatar")
          .in("id", userIds);

        if (usersError) {
          setFetchError("Could not fetch user details");
          return;
        }

        if (usersData) {
          setGroupMembers(usersData);
          setFetchError(null);
        }
      }
    };

    fetchGroupMembers();
  }, [id]);

  const handleJoinEvents = () => {
    setOpenEventModal(true);
  };
  async function goToEvent() {
    navigate("/createEvent", { state: { groupId: id } });
  }

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolved) => setTimeout(resolved, 1000));

      setLoading((loading) => !loading);
    };
    loadData();
  }, []);

  useEffect(() => {
    const fetchSetJoinGroup = async () => {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("group_members")
        .select()
        .eq("user_id", userId)
        .eq("group_id", id);
      if (error) {
        console.log(error);
      }
      if (data.length === 0) {
        setJoinGroup(true);
      }
    };
    fetchSetJoinGroup();
  }, []);

  const handleJoinGrp = async () => {
    const userId = await getUserId();
    const { data, error } = await supabase.from("group_members").insert([
      {
        user_id: userId,
        group_id: id,
      },
    ]);
    if (!error) {
      setJoinGroup(false);
    }
  };
  const handleLeaveGrp = async () => {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("group_members")
      .delete()
      .eq("user_id", userId)
      .eq("group_id", id);

    if (!error) {
      setJoinGroup(true);
    }
  };

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
          <h1 className="singleGroup__title">#{groups?.name}</h1>
          <div className="singleGroup__header">
            <div className="singleGroup__header--left">
              {/* <div className="singleGroup__header--days">
                <DateItem date={"Mon"} />
                <DateItem date={"Tues"} />
                <DateItem date={"Wed"} />
              </div> */}

              <div className="singleGroup__header--icons">
                <AvatarGroup max={4}>
                  {groupMembers &&
                    groupMembers.map((each) => (
                      <Avatar
                        key={each.id}
                        alt={each.first_name}
                        src={each.avatar}
                      />
                    ))}
                </AvatarGroup>

                <div className="singleGroup__btns">
                  {joinGroup != false ? (
                    <Btn
                      textBtn={"Join Group +"}
                      bgColor={"#6c3ed696"}
                      textColor={"white"}
                      marginLeft={"10rem"}
                      height={"35px"}
                      onClick={handleJoinGrp}
                    />
                  ) : (
                    <Btn
                      textBtn={"Leave Group -"}
                      bgColor={"#6c3ed696"}
                      textColor={"white"}
                      marginLeft={"10rem"}
                      height={"35px"}
                      onClick={handleLeaveGrp}
                    />
                  )}
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
              {/* <Btn
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
              /> */}
            </div>
          </div>
          <div className="singleGroup__columns">
            <div className="singleGroup__col-1">
              <div className="singleGroup__allImage">
                <img
                  className="singleGroup__img"
                  alt="hiking image"
                  src={groups?.image}
                />
              </div>

              <div className="singleGroup__descript">{groups?.description}</div>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
              />
            </div>
            <div className="singleGroup__col-2">
              {/* this is for the list of events */}
              <BtnList
                groupdId={groups?.id}
                onClickEvents={handleJoinEvents}
                events={events}
              />
            </div>
          </div>
          {/* {openModal && (
            <SingleGrpModal
              setOpenModal={setOpenModal}
              groupId={groups.id}
              groupName={groups.name}
              groupDescription={groups.description}
            />
          )} */}
          {openEventModal &&
            events.map((event, index) => (
              <SingleEventModal
                setOpenEventModal={setOpenEventModal}
                eventTitle={event.title}
                eventDescription={event.description}
                online={event.online}
                image={event.image}
                key={index}
              />
            ))}
        </section>
      </>
    );
  }
}

export default SingleGroup;
