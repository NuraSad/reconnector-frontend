import { useEffect, useState } from "react";
import GroupsCards from "../../components/mainComponents/GroupsCard/GroupsCard";
import supabase from "../../config/supabaseClient";
import "./Groups.scss";

export default function Groups() {
  const [groups, setGroups] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const [toggle, setToggle] = useState(false);
  const [location, setLocation] = useState("all");

  useEffect(() => {
    const fetchGroups = async (groupType) => {
      const { data, error } = await supabase.from("group").select();
      if (error) {
        console.log(error);
        setFetchError("Could not Fetch the Group");
      } else {
        console.log(data);
        // if (groupType === "inPerson") data.filter((group) => group.type === "inPerson")
        // else data.filter((group) => group.type === "online")
        if (groupType === "inPerson") data.reverse(); //<-- this is for testing only, need to include type filter in backend
        setFetchError(null);
        setGroups(data);
      }
    };
    toggle ? fetchGroups("inPerson") : fetchGroups("online");
    // fetchGroups();
  }, [toggle]);

  // console.log(groups);
  return (
    <section className="groups">
      <div className="groups__header">
        <h1 className="groups__title page-font">Groups</h1>
        <div className="groups__filter-wrapper"></div>
      </div>
      <div className="groups__cards">
        {fetchError
          ? // <p>{fetchError}</p>
            null
          : groups?.map((group) => (
              <GroupsCards
                key={group.id}
                id={group.id}
                groups__title={group.name}
                groups__image={group.image}
                groups__description={group.description}
              />
            ))}
      </div>
    </section>
  );
}
