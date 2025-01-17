import { useEffect, useState } from "react";
import "./SingleEventModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../../smallComponents/Btn/Btn";
import BackDrop from "../../smallComponents/BackDrop/BackDrop";
import supabase from "../../../config/supabaseClient";
import { getUserId } from "../../../userUtils.js";

const SingleEventModal = ({
  setOpenEventModal,
  eventTitle,
  groupId,
  handleJoinGrp,
}) => {
  const [toggle, setToggle] = useState(true);
  const [event, setEvent] = useState();
  const [userIds, setUserIds] = useState();
  const [userInfo, setUserInfo] = useState();
  const [fetchError, setFetchError] = useState("");
  const [joinEvent, setJoinEvent] = useState(false);
  // const timestamp = event[0].event_date;
  // const date = new Date(timestamp);

  const dateFormat = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // For 12-hour format with AM/PM
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const { data: eventData, error } = await supabase
        .from("event")
        .select("*")
        .eq("created_by_group_id", groupId)
        .eq("title", eventTitle);

      if (error) {
        setFetchError("Cannot fetch the Events");
        console.log(error);
        return;
      }
      setEvent(eventData);

      if (eventData && eventData.length > 0) {
        const { data: user_id, error } = await supabase
          .from("event_participants")
          .select("user_id")
          .eq("event_id", eventData[0].id);
        if (user_id) {
          setUserIds(user_id);
        } else {
          fetchError("Cannot Fetch userIds");
        }
      }
    };

    fetchEvent();
  }, [eventTitle, groupId]);

  useEffect(() => {
    const userids = userIds?.map((item) => item.user_id);
    const fetchUserInfo = async () => {
      try {
        const { data: userInfo, error: userInfoError } = await supabase
          .from("user")
          .select("avatar, first_name, last_name")
          .in("id", userids);
        if (userInfoError) {
          setFetchError("Cannot fetch the Users joined");
          console.log(error);
          return;
        }

        setUserInfo(userInfo);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserInfo();
  }, [userIds, joinEvent, event]);

  useEffect(() => {
    const fetchSetJoinEvent = async () => {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("event_participants")
        .select("*")
        .eq("user_id", userId)
        .eq("event_id", event[0].id);
      if (error) {
        console.log(error);
      }
      if (data.length > 0) {
        setJoinEvent(true);
      }
    };
    fetchSetJoinEvent();
  }, [event]);

  const handleJoinEvent = async () => {
    const userId = await getUserId();
    const { data, error } = await supabase.from("event_participants").insert([
      {
        user_id: userId,
        event_id: event[0].id,
      },
    ]);
    if (error) {
      console.log("error for joining" + error);
    }
    else {
      setJoinEvent(true);
      const { data: group_members, error: group_members_error } = await supabase
        .from("group_members")
        .select("*")
        .eq("user_id", userId)
        .eq("group_id", groupId);

      if (group_members_error) {
        console.log("Cannot connect to Db group_members");
      } else {
        if (group_members.length == 0) {
          await handleJoinGrp();
        } else {
          console.log("user_id and group_id already present in group_members table")
          return;
        }
      }
    }
   
  };

  const handleLeaveEvent = async () => {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from("event_participants")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", event[0].id);

    if (data) {
      setJoinEvent(false);
      console.log("you have left the group");
    }
    if (error) {
      console.log("error for leaving group" + error);
    }
  };

  const toggleJoin = async () => {
    if (joinEvent) {
      await handleLeaveEvent();
      setToggle(false)
    } else {
      await handleJoinEvent();
      setToggle(true)
    }
    //setToggle(!toggle);
  };

  return (
    <>
      <BackDrop />
      <div className="singlegrpmodal">
        <div className="singlegrpmodal__close">
          <CloseIcon onClick={() => setOpenEventModal(false)} />{" "}
        </div>
        {event && event ? (
          <section className="singlegrpmodal-content">
            <div className="singlegrpmodal-content-grp">
              <h1>#{eventTitle}</h1>
              <div className="singlegrpmodal-content-grp-info">
                <p>
                  {new Date(event[0].event_date).toLocaleString(
                    "en-US",
                    dateFormat
                  )}
                  {/* <DateFormatforEvent
                    date={event[0].event_date}
                  ></DateFormatforEvent> */}
                </p>
                <p>{event[0].online ? "Online Event" : "In-person Event"}</p>
              </div>
              <div className="singlegrpmodal-content-grp-btns">
                <Btn
                  textBtn={
                    event[0].online ? "Join Video Call" : "Attending-Event"
                  }
                  bgColor={"#6c3ed64f"}
                  fontSize={"16px"}
                  fontWeight={"Bold"}
                  textColor={"white"}
                  height={"35px"}
                  inputType={"checkbox"}
                  // inputType={!event[0].online ? "checkbox" : "null"}
                  checked={joinEvent ? toggle : !toggle}
                  onClick={toggleJoin}
                />
                <Btn
                  textBtn={"View Group"}
                  bgColor={"#6c3ed64f"}
                  fontSize={"16px"}
                  fontWeight={"Bold"}
                  textColor={"white"}
                  height={"35px"}
                  onClick={() => setOpenEventModal(false)}
                />
              </div>
              <p className="singlegrpmodal-content-grp-stmt">
                {event[0].description}
              </p>

              <div className="singlegrpmodal-content-grp-map">
                <h3>Location</h3>
                {event[0].location}
              </div>
              <div className="singlegrpmodal-content-grp-img">
                {event[0].event_image && (
                  <img
                    src={event[0].event_image}
                    alt={`${event[0].title}'s banner`}
                  />
                )}
              </div>
            </div>
            <div className="singlegrpmodal-content-joiners">
              <h1>Who's Joining</h1>
              <div className="singlegrpmodal-content-joiners-list">
                {" "}
                {userInfo?.map((i, index) => (
                  <div
                    className="singlegrpmodal-content-joiners-list-ppl"
                    key={index}
                  >
                    <div className="avatarImage">
                      <img src={i.avatar} alt="" />
                    </div>
                    <div className="avatarName">
                      <p>
                        {i.first_name} {i.last_name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>fetchError</>
        )}
      </div>
    </>
  );
};

export default SingleEventModal;
