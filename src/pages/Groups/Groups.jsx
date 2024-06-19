import { useEffect, useState } from "react";
import "./Groups.scss";
import GroupsCards from "../../components/mainComponents/GroupsCard/GroupsCard";
import supabase from "../../config/supabaseClient";

export default function Groups() {
  const [groups, setGroups] = useState(null);
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

  return (
    <section className="groups">
      <h1 className="groups__title page-font">Groups</h1>
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
