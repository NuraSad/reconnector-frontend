import groupInfo from "../../data/groups.json";
import eventInfo from "../../data/events.json";
import { useParams } from "react-router-dom";
import DateItem from "../../components/smallComponents/DateItem/DateItem";
import "./SingleGroup.scss";
import listAvatars from "../../data/listAvatars.json";
import { useEffect, useState } from "react";
import ProfileIcons from "../../components/smallComponents/ProfileIcons/ProfileIcons";
import supabase from "../../config/supabaseClient";
import Btn from "../../components/smallComponents/Btn/Btn";

function SingleGroup() {
  const { id } = useParams();
  const [groups, setGroups] = useState(groupInfo);
  const [fetchError, setFetchError] = useState(null);
  //state for the avatars coming in from the data file which will come in from the database later
  console.log(listAvatars);
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
              <ProfileIcons
                className="singleGroup__header--days"
                users={usersAvatar}
                // moveBottom={"50%"}
                moveLeft={"-50%"}
                marginTop={"1rem"}
              />

              <Btn
                textBtn={"Join Group +"}
                bgColor={"#6c3ed696"}
                textColor={"white"}
                marginLeft={"10rem"}
              />
            </div>
            <div className="singleGroup__header--right">
              <Btn
                textBtn={"In-person"}
                bgColor={"#D9D9D9"}
                textColor={"white"}
                marginTop={"1rem"}
              />
              <Btn
                textBtn={"Vancouver"}
                bgColor={"#D9D9D9"}
                textColor={"white"}
                marginTop={"1rem"}
              />
            </div>
          </div>
          <div className="singleGroup__columns">
            <div className="singleGroup__col-1"></div>
            <div className="singleGroup__col-2"></div>
          </div>
        </section>
      )}
    </>
  );
}

export default SingleGroup;
