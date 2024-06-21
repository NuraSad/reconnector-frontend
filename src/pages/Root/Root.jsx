import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import logo from "../../assets/icons/reconnect-logo.svg";
import companyLogo from "../../assets/icons/starbacks-logo.png";
import eventImage from "../../assets/running-club.jpg";
import samantha from "../../assets/samantha.png";
import supabase from "../../config/supabaseClient";
import "./Root.scss";

function SmallEventCard({ name, src, attendees, date }) {
  return (
    <div className="event-card">
      <img src={src} alt="dimmed event theme" />
      <p className="date">{date}</p>
      <p className="num">{attendees}</p>
      <p className="name">{`# ${name}`}</p>
    </div>
  );
}

const events = [
  {
    event_id: "1",
    date: "Monday @3:30pm",
    name: "running sunday fun day",
    attendees: 25,
    src: eventImage,
  },
  {
    event_id: "2",
    date: "Friday @12:30pm",
    name: "running sunday fun day",
    attendees: 25,
    src: eventImage,
  },
  {
    event_id: "3",
    date: "Sunday @8:30am",
    name: "running sunday fun day",
    attendees: 25,
    src: eventImage,
  },
];

export default function Root() {
  const user = {
    name: "Samantha",
    company: companyLogo,
    src: samantha,
    groups: 8,
    points: 123,
    streak: 2,
  };

  return (
    <div className="container">
      <nav>
        <img className="root__logo" src={logo} />
        <div className="user-info">
          <div className="avatar-field">
            <Link to="/profile">
              <img id="avatar" src={user.src} alt={`${user.name}'s avatar`} />
            </Link>
            <img
              id="company-logo"
              src={user.company}
              alt={`${user.name}'s company logo`}
            />
          </div>
          <h4 className="root__user">{user.name}</h4>
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
        <ul className="root__navlink">
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
          <li>
						<Link onClick={() => supabase.auth.signOut()}>Logout</Link>
					</li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
      <div className="sidebar">
        <h3>Upcoming Events</h3>
        {events.map((event) => (
          <SmallEventCard
            key={event.event_id}
            name={event.name}
            src={event.src}
            attendees={event.attendees}
            date={event.date}
          />
        ))}
      </div>
    </div>
  );
}
