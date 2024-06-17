import React, { useEffect, useState } from "react";
import "./Groups.scss";
import GroupsCards from "../../components/mainComponents/GroupsCard/GroupsCard";
import supabase from "../../config/supabaseClient";

// const groups = [
//     {
//       id: 1,
//       title: "Group 1",
//       image: "https://images.unsplash.com/photo-1508789454646-bef72439f197?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       description: "lorum ipsum dolor sit amet In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem, id faucibus odio. Duis eu nisl ut ligula cursus molestie at at dolor."
//     },
//     {
//       id: 2,
//       title: "Group 2",
//       image: "https://images.unsplash.com/photo-1508789454646-bef72439f197?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       description: "lorum ipsum dolor sit amet In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem, id faucibus odio. Duis eu nisl ut ligula cursus molestie at at dolor."
//     },
//     {
//       id: 3,
//       title: "Group 3",
//       image: "https://images.unsplash.com/photo-1508789454646-bef72439f197?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       description: "lorum ipsum dolor sit amet In at iaculis lorem. Praesent tempor dictum tellus ut molestie. Sed sed ullamcorper lorem, id faucibus odio. Duis eu nisl ut ligula cursus molestie at at dolor."
//     },
//   ];


export default function Groups() {
  const [groups, setGroups] = useState(null);
const [fetchError, setFetchError] = useState(null);
useEffect(() => {
  const fetchGroups = async () => {
    const { data, error } = await supabase.from('group').select();

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
