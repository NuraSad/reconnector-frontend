import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import fireIcon from "../../assets/icons/icon_fire.png";
import groupIcon from "../../assets/icons/icon_people-group.svg";
import pointsIcon from "../../assets/icons/icon_star.svg";
import logo from "../../assets/icons/reconnect-logo.svg";
import companyLogo from "../../assets/icons/starbacks-logo.png";
import CardList from "../../components/mainComponents/CardList/CardList";
import supabase from "../../config/supabaseClient";
import { getUserId } from "../../userUtils.js";
import "./Root.scss";

export default function Root() {
  const [internalUserId, setInternalUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [userCompany, setUserCompany] = useState(null);
  const [userGroupsCount, setUserGroupsCount] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setInternalUserId(userId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      let { data: user_data, error: user_error } = await supabase
        .from("user")
        .select()
        .eq("id", internalUserId);

      if (user_error) {
        console.error("Error fetching user:", user_error.message);
        return;
      }

      if (user_data && user_data.length > 0) {
        setUser(user_data[0]);
      }
    };

    if (internalUserId) {
      getUser();
    }
  }, [internalUserId]);

  useEffect(() => {
    const getUserCompany = async () => {
      let { data: user_company_data, error: user_company_error } =
        await supabase.from("company").select().eq("id", user.company_id);

      if (user_company_error) {
        console.error("Error fetching user:", user_company_error.message);
        return;
      }

      if (user_company_data && user_company_data.length > 0) {
        setUserCompany(user_company_data[0]);
      }
    };

    const getUserGroupCount = async () => {
      let { count } = await supabase
        .from("group_members")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (count) {
        setUserGroupsCount(count);
      }
    };

    if (user) {
      getUserCompany();
      getUserGroupCount();
    }
  }, [user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data: events, error: errorEvent } = await supabase
          .from("event")
          .select("*");
        if (errorEvent) {
          console.log("Error fetching connecting the database", errorEvent);
          return;
        }

        setEvents(events);
      } catch (error) {
        console.log("Error happened", error.message);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const eventIds = events.map((event) => event.id);

    const fetchEventParticipants = async () => {
      try {
        const { data: eventParticipant, error: eventParticipantError } =
          await supabase.rpc(`geteventparticipantcount`, {
            event_ids: eventIds,
          });
        if (eventParticipantError) {
          console.log("Problem in connecting with event_participant database");
          return;
        }

        const updatedEvents = events.map((event) => {
          const foundEvent = eventParticipant.find(
            (item) => event.id === item.event_id
          );

          return {
            ...event,
            NumberOfParticipants: foundEvent
              ? foundEvent.eventparticipantcount
              : 0,
          };
        });
        if (JSON.stringify(updatedEvents) !== JSON.stringify(events)) {
          setEvents(updatedEvents);
        }
      } catch (error) {
        console.log("Error in db connection", error.message);
      }
    };
    fetchEventParticipants();
  }, [events]);

  return (
    user && (
      <div className="container">
        <nav>
          <Link to="/">
            <img className="root__logo" src={logo} />
          </Link>
          <div className="user-info">
            <div className="avatar-field">
              <Link to="/">
                <img
                  id="avatar"
                  src={user.avatar ? user.avatar : ""}
                  alt={`${user.first_name}'s avatar`}
                />
              </Link>
              <img
                id="company-logo"
                src={
                  userCompany && userCompany.logo
                    ? userCompany.logo
                    : companyLogo
                }
                alt={`${user.first_name}'s company logo`}
              />
            </div>
            <h4 className="root__user">{user.first_name}</h4>
            <h5>{user.location}</h5>
            <div className="stats-field">
              <div className="stat">
                <img src={groupIcon} alt="group of people" />
                <p>{userGroupsCount}</p>
              </div>
              <div className="stat">
                <img src={pointsIcon} alt="star" />
                <p>{user.points ? user.points : 0}</p>
              </div>
              <div className="stat">
                <img src={fireIcon} alt="fire" />
                <p>{user.streak ? user.streak : 0}</p>
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
            {//commented out for now, not enough time for implementation
            /* <li>
              <NavLink
                to="/maps"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Maps
              </NavLink>
            </li> */}
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
              <Link to="/createGroup">
                <button className="btn">Start New Group</button>
              </Link>
            </li>
            <li>
              <Link to="/createPost">
                <button className="btn">Create Post</button>
              </Link>
            </li>
            <li>
              <Link onClick={() => supabase.auth.signOut()}>Logout</Link>
            </li>
          </ul>
        </nav>
        <div className="outlet">
          <Outlet />
        </div>

        <CardList events={events} title={"Upcoming Events"} />
      </div>
    )
  );
}
