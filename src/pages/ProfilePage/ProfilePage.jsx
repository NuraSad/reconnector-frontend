import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import Post from "../../components/mainComponents/Post/Post";
import MiniGroup from "../../components/smallComponents/MiniGroup/MiniGroup";
import UpdateProfilePopup from "../../components/mainComponents/UpdateProfilePopup/UpdateProfilePopup";
import PropTypes from "prop-types";
import bikingMedal from "../../assets/medals/biking-medal.png";
import hikingMedal from "../../assets/medals/hiking-medal.png";
import groupBanner from "../../assets/running-club.jpg";
import supabase from "../../config/supabaseClient";
import createIcon from '../../assets/icons/create.svg';
import fireIcon from '../../assets/icons/icon_fire.png';
import pointsIcon from '../../assets/icons/icon_star.svg';

export default function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userCompany, setUserCompany] = useState(null);


  useEffect(() => {
    async function getUser() {
      let { data: user_data, error: user_error } = await supabase
        .from("user")
        .select("*")
        .eq("id", userId);

      if (user_error) {
        console.error("Error fetching user:", user_error.message);
        return;
      }

      if (user_data && user_data.length > 0) {
        setUser(user_data[0]);
      }
    }

    if (userId) {
      getUser();
    }
  }, [userId]);

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

    async function getPosts() {
      let { data: posts_data, error: posts_error } = await supabase
        .from("post")
        .select("*")
        .eq("created_by", user.id);

      if (posts_error) {
        console.error("Error fetching posts:", posts_error.message);
        return;
      }

      if (posts_data) {
        setPosts(posts_data);
      }
    }

    async function getGroupsIds() {
      let { data: groups_data, error: groups_error } = await supabase
        .from("group_members")
        .select("*")
        .eq("user_id", user.id);

      if (groups_error) {
        console.error("Error fetching posts:", groups_error.message);
        return;
      }

      if (groups_data) {
        return groups_data
      }
    }

    async function getGroups() {
      const groupsIdsData = await getGroupsIds();
      const groupsIds = groupsIdsData.reduce((acc, group) => acc.concat(group.group_id), [])
      if (groupsIds.length) {
        let { data: groups_data, error: groups_error } = await supabase
        .from("group")
        .select()
        .in("id", groupsIds);

      if (groups_error) {
        console.error("Error fetching posts:", groups_error.message);
        return;
      }

      if (groups_data) {
        setGroups(groups_data)
      }
    }
  }

    if (user) {
      if (!user.company_id || !user.location){
          setIsEditing(true)
        } else {
          getUserCompany();
          getPosts();
          getGroups();
        }
    }
    
  }, [user]);

  if(user && isEditing){
    return (
      <UpdateProfilePopup userInit={user} onClose={() => setIsEditing(prev => !prev)}/>
    )
  }

  return (
    user && (
      <div className="user-profile">
        <h1 className="user-profile__title page-font"></h1>
        <div className="user-profile__container">
          <div className="top">
            <div className="avatar-field">
              <div className="stat">
                <img src={fireIcon} alt="fire"/>
                <p>{user.streak}</p>
              </div>
              <div className="avatar">
                <img
                  className="photo"
                  src={user.avatar}
                  alt={`${user.first_name} avatar`}
                />
                {userCompany && (
                  <img
                    className="logo"
                    src={userCompany.logo}
                    alt={`${userCompany.name}'s logo`}
                  />
                )}
              </div>
              <div className="stat">
                <img src={pointsIcon} alt="star"/>
                <p>{user.points}</p>
              </div>
            </div>
            <h4>{`${user.first_name} ${user.last_name}`}</h4>
            <p className="email">{user.email}</p>
            <p>{user.location}</p>
            <button className="edit-btn" onClick={() => setIsEditing(true)}><img src={createIcon} alt="edit icon"/></button>
          </div>
          <h3>Featured Awards</h3>
          <div className="awards-field">
            <div className="award">
              <img src={bikingMedal} alt="men riding a bike" />
              <span>Cycling Commute Champion</span>
              <p> Awarded for the most miles cycled while commuting.</p>
            </div>
            <div className="award central">
              <img src={hikingMedal} alt="men climbing" />
              <span>Hiking Hero</span>
              <p>Awarded for completing the most challenging hiking trails.</p>
            </div>
            <div className="award">
              <img src={bikingMedal} alt="men riding a bike" />
              <span>Cycling Commute Champion</span>
              <p> Awarded for the most miles cycled while commuting.</p>
            </div>
          </div>
          <h3>Most Active Groups</h3>
          <div className="groups-field">
            {groups.length ? (
              groups.map((group, i)=> (
                <Link key={i} to={`/groups/${group.id}`}>
                  <MiniGroup name={group.name} src={group.image} />
                </Link>
              ))
            ) : <p className="empty-message">You have no groups</p>}
          </div>
          <h3>Recent Post</h3>
          <div className="posts-field">
            {posts.length ? (
              posts.map((i) => (
                <Post
                  key={i.id}
                  profileAvatar={i.profileAvatar}
                  last_name={i.last_name}
                  first_name={i.first_name}
                  username={i.created_by}
                  tag={i.group_name}
                  img1={i.images}
                  img2={i.img_sec}
                  img3={i.img_third}
                  postTitle={i.title}
                  postText={i.body}
                  likes={i.likes}
                />
              ))
            ) : (
              <p className="empty-message">You have no posts</p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

ProfilePage.propTypes = {
  userId: PropTypes.number,
};
