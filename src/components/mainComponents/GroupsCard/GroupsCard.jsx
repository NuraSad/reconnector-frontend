import { useState } from "react";
import "./GroupsCard.scss";
// import user1 from "../../../assets/user1.png";
import plus from "../../../assets/icons/icon_plus.svg";
import ProfileIcons from "../../smallComponents/ProfileIcons/ProfileIcons";
import listAvatars from "../../../data/listAvatars.json";
import DateItem from "../../smallComponents/DateItem/DateItem";

function joinGroup() {
  alert("Join Group");
  //link to the group page
  //useParams
}

// function DateItem({ date }) {
//   return <div className="dates__item">{date}</div>;
// }

// const usersAvatar = [
//   { id: 1, name: "John Doe", src: user1 },
//   { id: 2, name: "Jane Smith", src: user1 },
//   { id: 3, name: "Michael Johnson", src: user1 },
//   { id: 4, name: "Emily Davis", src: user1 },
//   { id: 5, name: "David Wilson", src: user1 },
//   { id: 6, name: "Sarah Anderson", src: user1 },
//   { id: 7, name: "Matthew Thompson", src: user1 },
//   { id: 8, name: "Olivia Martinez", src: user1 },
//   { id: 9, name: "Daniel Taylor", src: user1 },
//   { id: 10, name: "Sophia Hernandez", src: user1 },
// ];

// function ProfileIcons({users}) {
//   return (
//     <div className="profile-icons">
//       {users.slice(0, 5).map((user) => (
//         <img alt={`${user.name}`} src={user.src} className="profile-icons__icon" key={user.id} />
//       ))}
//       <div className="profile-icons__count">{users.length - 4 }+</div>
//     </div>
//   );
// }

export default function GroupsCard(props) {
  //state for the avatars coming in from the data file which will come in from the database later
  const [usersAvatar, setUsersAvatar] = useState(listAvatars);
  return (
    <div className="groupCard">
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
          <img src={props.groups__image} alt="group image" />
        </div>
        <div className="content">
          <div className="content__description">
            {props.groups__description}
          </div>
          <div className="content__join-button" onClick={() => joinGroup()}>
            <img src={plus} alt="join group" />
          </div>
        </div>
      </div>
    </div>
  );
}
