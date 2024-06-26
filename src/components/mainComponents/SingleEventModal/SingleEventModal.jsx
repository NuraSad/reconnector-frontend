import React, { useEffect, useState } from "react";
import "./SingleEventModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../../smallComponents/Btn/Btn";
import Map from "../../../pages/Map/Map";
import listavatars from "../../../data/listAvatars.json";
import BackDrop from "../../smallComponents/BackDrop/BackDrop";
import supabase from "../../../config/supabaseClient";
const SingleEventModal = ({ setOpenEventModal, eventTitle, groupId }) => {
  const [toggle, setToggle] = useState(true);
  const [event, setEvent] = useState();
  const [userIds, setUserIds] = useState();
  const [userInfo, setUserInfo] = useState();
  const [fetchError, setFetchError] = useState("");
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
  }, [eventTitle]);

  useEffect(() => {
    const userids = userIds?.map((item) => item.user_id);
    const fetchUserInfo = async () => {
      try {
        const { data: userInfo, error: userInfoError } = await supabase
          .from("user")
          .select("avatar, first_name,last_name")
          .in("id", userids);
        if (userInfoError) {
          setFetchError("Cannot fetch the Users joined");
          console.log(error);
          return;
        }
        //console.log(userInfo);
        setUserInfo(userInfo);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserInfo();
  }, [userIds]);
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
                <p>Monday @ 3:30pm</p>
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
                  inputType={!event[0].online ? "checkbox" : "null"}
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                />
                <Btn
                  textBtn={"View Group"}
                  bgColor={"#6c3ed64f"}
                  fontSize={"16px"}
                  fontWeight={"Bold"}
                  textColor={"white"}
                  height={"35px"}
                />
              </div>
              <p className="singlegrpmodal-content-grp-stmt">
                {event[0].description}
              </p>
              <h3>Gear You Need</h3>
              <p className="singlegrpmodal-content-grp-gear">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse lacinia eros vitae nunc feugiat sollicitudin.
                <ul>
                  <li>
                    Donec suscipit, erat a rhoncus cursus, orci dui varius
                    augue, vel blandit augue magna ut orci.
                  </li>
                  <li>
                    Pellentesque in lorem volutpat, blandit urna eu, laoreet
                    magna. Pellentesque sed eros tellus. Donec gravida porta
                    nibh ac luctus.
                  </li>
                  <li>
                    Aliquam eu magna vel lorem tincidunt faucibus ac vitae
                    felis. Nam in sodales felis, nec dictum ex.
                  </li>
                </ul>
              </p>
              <div className="singlegrpmodal-content-grp-map">
                <h3>Location</h3>
                <Map />
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
