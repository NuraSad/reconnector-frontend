import { useEffect, useState } from "react";
import "./SingleLeaderBoard.scss";
import { useLocation, useParams } from "react-router-dom";
import icon_medal from "../../assets/icons/icon_medal.svg";
import icon_star from "../../assets/icons/icon_star.svg";
import icon_people from "../../assets/icons/icon_people-group.svg";
import icon_fire from "../../assets/icons/icon_fire.png";
import Post from "../../components/mainComponents/Post/Post";
import supabase from "../../config/supabaseClient";

const SingleLeaderBoard = () => {
  const { id } = useParams();

  const [fetchError, setFetchError] = useState("");
  const [users, setUsers] = useState([]);
  const location = useLocation();

  const {
    logo,
    points,
    medals,
    employeeCount,
    companyId,
    companyName,
    description,
  } = location.state;
  useEffect(() => {
    const fetchUser = async (id) => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("company_id", id);

      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        setUsers(data);
        
      }
    };

    fetchUser(id);

  }, [id]);

  useEffect(() => {
    if (users.length == 0) return;
    const userIds = users.map((item) => item.id);
    const fetchGroup = async () => {
      const { data: grpCount, error } = await supabase.rpc(`getgroupcount`, {
        user_ids: userIds,
      });
      if (error) {
        setFetchError("Error fetching in group");
      } else {
        const updatedUsers = users.map((item) => {
          const foundgrp = grpCount.find((data) => data.user_id === item.id);
          if (foundgrp) return { ...item, groupCount: foundgrp.groupcount };
          else {
            return item;
          }
        });
        if (JSON.stringify(updatedUsers) !== JSON.stringify(users)) {
          setUsers(updatedUsers);
        }
      }
    };

    fetchGroup();
  }, [users]);

  const [posts, setPosts] = useState();

  useEffect(() => {
    async function getPosts() {
      const userIds = users.map((item) => item.id);
      let { data: posts_data, error: posts_error } = await supabase
        .from("post")
        .select()
        .in("created_by", userIds);

      if (posts_error) {
        console.error("Error fetching posts:", posts_error.message);
        return;
      }

      if (posts_data) {
        setPosts(posts_data);
      }
    }
    getPosts();
  }, [users]);

  return (
    <div className="singleleaderboard">
      {fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <div className="singleleaderboard-first">
          <section className="singleleaderboard-first-companyLogo">
            <img src={logo} alt="" />
          </section>
          <section className="singleleaderboard-first-description">
            <h1 className="company-heading"> {companyName}</h1>
            <div className="company-bulletins">
              <article className="company-bulletins-item">
                {" "}
                <img src={icon_medal} alt="" />
                <span>{medals}</span>
              </article>
              <article className="company-bulletins-item">
                {" "}
                <img src={icon_star} alt="" />
                <span>{points}</span>
              </article>
              <article className="company-bulletins-item">
                {" "}
                <img src={icon_people} alt="" />
                <span>{employeeCount}</span>
              </article>
            </div>
            <p className="company-description">{description}</p>
          </section>
        </div>
      )}

      <div className="singleleaderboard-second">
        <section className="singleleaderboard-second-heading">
          <div>
            <h3>Top Star Holders</h3>
          </div>
          <div>
            <h5>Total Stars</h5>
          </div>
          <div>
            <h5>Week Streaks</h5>
          </div>
          <div>
            <h5>Groups Apart Of</h5>
          </div>
          <div>
            <h5 className="activegroup">Most Active Groups</h5>
          </div>
        </section>
        {users?.map((item, index) => (
          <section className="singleleaderboard-second-data" key={index}>
            <div className="author">
              <img className="author-image" src={`${item.avatar}`} alt="" />
              <span>
                {item.first_name} {item.last_name}
              </span>
            </div>
            <div>
              <img src={icon_star} alt="" />
              <span>{item.points}</span>
            </div>
            <div>
              <img src={icon_fire} alt="aoo" />
              <span>{item.streak}</span>
            </div>
            <div>
              <img src={icon_people} alt="" />
              <span>{item.groupCount}</span>
            </div>
            <div className="activegroups">
              {/* {item.most_active_group.slice(0, 2).map((mag, index) => (
                <span className="activegroups-outline" key={index}>
                  {mag}
                </span>
              ))} */}
            </div>
          </section>
        ))}
      </div>
      <div className="singleleaderboard-third">
        <h3>Trending Posts</h3>
        <article className="singleleaderboard-third-posts">
          {posts?.map((post) => (
            <Post
              key={post.id}
              profileAvatar={post.profileAvatar}
              last_name={post.last_name}
              first_name={post.first_name}
              username={post.created_by}
              tag={post.group_name}
              img1={post.image}
              postTitle={post.title}
              postText={post.body}
              likes={post.likes}
            />
          ))}
        </article>
      </div>
    </div>
  );
};

export default SingleLeaderBoard;
