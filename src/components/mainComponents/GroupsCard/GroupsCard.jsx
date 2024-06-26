import "./GroupsCard.scss";
import plus from "../../../assets/icons/icon_plus.svg";
import { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Link, useNavigate } from "react-router-dom";

export default function GroupsCard(props) {
  const navigate = useNavigate();
  const [groupMembers, setGroupMembers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  //state for the avatars coming in from the data file which will come in from the database later
  //we need to be pulling the event information and the group information in here, does this come from the parent?

  //query the users in this group
  useEffect(() => {
    const fetchGroupMembers = async () => {
      const groupId = props.id;
      if (!props.id) {
        setFetchError("No group ID provided");
        return;
      }
      const { data: groupMembersData, error: groupMembersError } =
        await supabase
          .from("group_members")
          .select("user_id")
          .eq("group_id", groupId);
      if (groupMembersError) {
        setFetchError("Could not fetch user details");
        return;
      }
      if (groupMembersError) {
        setFetchError("Could not fetch the group members");
        return;
      }

      if (groupMembersData) {
        // Extract user_ids
        const userIds = groupMembersData.map((member) => member.user_id);
        console.log(userIds);
        // Fetch user details from users table
        const { data: usersData, error: usersError } = await supabase
          .from("user")
          .select("first_name, avatar")
          .in("id", userIds);

        if (usersError) {
          setFetchError("Could not fetch user details");
          return;
        }

        if (usersData) {
          // Combine the data
          const combinedData = groupMembersData.map((member) => {
            const user = usersData.find((user) => user.id === member.user_id);
            console.log(user);
            return { ...member, user };
          });
          // console.log(combinedData);
          setGroupMembers(usersData);
          setFetchError(null);
        }
      }
    };

    fetchGroupMembers();
  }, [props.id]);
  return (
    <div
      className="groupCard"
      onClick={() => navigate(`/groups/${props.id}`)} //replaces the below code
      // onClick={() => (window.location.href = `/groups/${props.id}`)}
    >
      <div className="groupCard__wrapper">
        <div className="header">
          <div className="header__group-title">{props.groups__title}</div>

          <AvatarGroup max={4}>
            {groupMembers &&
              groupMembers.map((each) => (
                <Avatar key={each.id} alt={each.first_name} src={each.avatar} />
              ))}
          </AvatarGroup>
        </div>
        <div className="dates">
          {/* <DateItem date="Mon" />
          <DateItem date="Tue" /> */}
        </div>
        <div className="image">
          <img src={props.groups__image} alt={props.groups__title} />
        </div>
        <div className="content">
          <div className="content__description">
            {props.groups__description}
          </div>
          <Link to={`/groups/${props.id}`}>
            <div className="content__join-button">
              <img src={plus} alt="join group" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
