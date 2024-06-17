import "./Root.scss";
import samantha from "../../assets/samantha.png";
import companyLogo from "../../assets/icons/starbacks-logo.png";
import logo from '../../assets/icons/reconnect-logo.svg';
import {
  Outlet,
  NavLink,
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
  redirect,
  Link,
} from "react-router-dom";


export default function Root() {
  const user = {
    name: 'Samantha',
    company: companyLogo,
    src: samantha,
    groups: 8,
    points: 123,
    streak: 2
  }

  return (
    <div className="container">
      <nav>
        <img src={logo}/>
        <div className="user-info">
          <div className="avatar-field">
            <img id='avatar' src={user.src} alt={`${user.name}'s avatar`} />
            <img id ='company-logo' src={user.company} alt={`${user.name}'s company logo`} />
          </div>
          <h4>{user.name}</h4>
          <div className="stats-field">
            <div className="stat">
              <p>&#128101;</p>
              <p>{user.groups}</p>
            </div>
            <div className="stat">
              <p>&#127775;</p>
              <p>{user.points}</p>
            </div>
            <div className="stat">
              <p>&#128293;</p>
              <p>{user.streak}</p>
            </div>
          </div>
        </div>
        <ul>
          <li>
        <NavLink
          to="/explore"
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
        >
          Explore
        </NavLink>
        </li>
        <li>
        <NavLink
          to="/groups"
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
        >
          Groups
        </NavLink>
        </li>
        <li>
        <NavLink
          to="/calendar"
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
        >
          Calendar
        </NavLink>
        </li>
        <li>
        <NavLink
          to="/maps"
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
        >
          Maps
        </NavLink>
        </li>
        <li>
        <NavLink
          to="/leaderboards"
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
        >
          Leaderboards
        </NavLink>
        </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
      <div className="sidebar">
        <h3>Upcoming Events</h3>
      </div>
    </div>
  );
}
