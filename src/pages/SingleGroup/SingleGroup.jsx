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

function SingleGroup() {
  const { id } = useParams();
  const [groups, setGroups] = useState(groupInfo);
  const [fetchError, setFetchError] = useState(null);

  const [tempGroup, setTempGroup] = useState(tempGroupData);
  //state for the avatars coming in from the data file which will come in from the database later
  const [usersAvatar] = useState(listAvatars);
  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase.from("group").select();

      if (error) {
        console.log(error);
        setFetchError("Could not Fetch the Group");
      }
      if (data) {
        setGroups(data);
        setFetchError(null);
      }
    };
    fetchGroups();
  }, []);
  //pulls in a few parts of information from group (look at database)
  //pulls in the rest from events for the group

  //state for the groups and events
  // const [groups, setGroups] = useState(groupInfo);
  const [event, setEvents] = useState(eventInfo);

  //find the group from the useParams
  const thisGroup = groups.find((el) => el.id === parseInt(id));
  const tempGroupFind = tempGroup.find((el) => el.id === parseInt(id));
  console.log(tempGroupFind);
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
            </div>
            <div className="singleGroup__col-2"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default SingleGroup;
