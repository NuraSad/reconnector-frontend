import groupInfo from "../../data/groups.json";
import eventInfo from "../../data/events.json";
import { useParams } from "react-router-dom";
import DateItem from "../../components/smallComponents/DateItem/DateItem";
import "./SingleGroup.scss";
import { useEffect, useState } from "react";

import supabase from "../../config/supabaseClient";

function SingleGroup() {
  const { id } = useParams();
  const [groups, setGroups] = useState(groupInfo);
  const [fetchError, setFetchError] = useState(null);

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
