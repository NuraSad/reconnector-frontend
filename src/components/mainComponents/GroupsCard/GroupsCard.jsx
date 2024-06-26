import { useState } from "react";
import "./GroupsCard.scss";
import plus from "../../../assets/icons/icon_plus.svg";
import ProfileIcons from "../../smallComponents/ProfileIcons/ProfileIcons";
import listAvatars from "../../../data/listAvatars.json";
import DateItem from "../../smallComponents/DateItem/DateItem";
import { Link } from "react-router-dom";

export default function GroupsCard(props) {
  //state for the avatars coming in from the data file which will come in from the database later
  const [usersAvatar] = useState(listAvatars);
  //we need to be pulling the event information and the group information in here, does this come from the parent?
  return (
    <div className="groupCard" onClick={()=> window.location.href = `/groups/${props.id}`}>
      <div className="groupCard__wrapper">
        <div className="header">
          <div className="header__group-title">{props.groups__title}</div>
          <ProfileIcons users={usersAvatar} />
        </div>
        <div className="dates">
          <DateItem date="Mon" />
          <DateItem date="Tue" />
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
