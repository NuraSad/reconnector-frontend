import groupInfo from "../../data/groups.json";
import eventInfo from "../../data/events.json";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DateItem from "../../components/smallComponents/DateItem/DateItem";
import "./SingleGroup.scss";

function SingleGroup() {
  const { id } = useParams();
  console.log(id);
  //pulls in a few parts of information from group (look at database)
  //pulls in the rest from events for the group

  //state for the groups and events
  const [groups, setGroups] = useState(groupInfo);
  const [event, setEvents] = useState(eventInfo);

  //find the group from the useParams
  const thisGroup = groups.find((el) => el.id === parseInt(id));

  console.log("groups", groups);
  return (
    <section className="singleGroup">
      <h1 className="singleGroup__title">#{thisGroup.groupName}</h1>
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
  );
}

export default SingleGroup;
