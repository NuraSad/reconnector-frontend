import { useEffect, useState } from "react";
import "./Groups.scss";
import GroupsCards from "../../components/mainComponents/GroupsCard/GroupsCard";
import supabase from "../../config/supabaseClient";

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

  return (
    <section className="groups">
      <div className="groups__header">
        <h1 className="groups__title page-font">Groups</h1>
        <div className="groups__filter-wrapper">
          <div className="toggle-div">
            <label htmlFor="toggle-checkbox">Online</label>
            <input
              checked={toggle}
              type="checkbox"
              id="toggle-checkbox"
              onChange={() => setToggle(!toggle)}
            />
          </div>
          <div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="groups__cards">
        {fetchError ? (
          <p>{fetchError}</p>
        ) : (
          groups?.map((group) => (
            <GroupsCards
              key={group.id}
              id={group.id}
              groups__title={group.title}
              groups__image={group.image}
              groups__description={group.description}
            />
          ))
        )}
      </div>
    </section>
  );
}
