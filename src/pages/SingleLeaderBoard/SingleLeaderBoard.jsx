import React, { useEffect, useState } from "react";
import "./SingleLeaderBoard.scss";
import { useParams } from "react-router-dom";
import starbucks from "../../assets/starbucks.png";
import icon_medal from "../../assets/icons/icon_medal.svg";
import icon_star from "../../assets/icons/icon_star.svg";
import icon_people from "../../assets/icons/icon_people-group.svg";
import icon_fire from "../../assets/icons/icon_fire.png";
import user1 from "../../assets/user1.png";
import posts from "../../data/postData.json";
import Post from "../../components/mainComponents/Post/Post";
import supabase from "../../config/supabaseClient";
const leaderboard = [
  {
    username: "Alex Guerrerro",
    total_starts: 408,
    week_streaks: 123,
    groups_apart_of: 8,
    most_active_group: ["#Mountain Bike Ride", "#Girls Running and Drinks"],
  },
  {
    username: "Brown Guerrerro",
    total_starts: 408,
    week_streaks: 12,
    groups_apart_of: 8,
    most_active_group: ["#Mountain Bike Ride", "#Girls Running and Drinks"],
  },
  {
    username: "Rima Guerrerro",
    total_starts: 411,
    week_streaks: 17,
    groups_apart_of: 80,
    most_active_group: ["#Mountain Bike Ride"],
  },
  {
    username: "Alex Ray",
    total_starts: 800,
    week_streaks: 12,
    groups_apart_of: 157,
    most_active_group: [
      "#Mountain Bike Ride",
      "#Girls Running and Drinks",
      "#Hiking park",
    ],
  },
  {
    username: "Alex Ray",
    total_starts: 800,
    week_streaks: 12,
    groups_apart_of: 157,
    most_active_group: [
      "#Mountain Bike Ride",
      "#Girls Running and Drinks",
      "#Hiking park",
    ],
  },
];
const SingleLeaderBoard = () => {
  const { id } = useParams();

  const [fetchError, setFetchError] = useState("");
  const [fetchOne, setFetchOne] = useState([]);
  useEffect(() => {
    const fetchSingleCompany = async (id) => {
      const { data, error } = await supabase
        .from("company")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        setFetchOne(data);
        console.log(data);
        setFetchError(null);
      }
    };
    fetchSingleCompany(id);
  }, [id]);
  return (
    <div className="singleleaderboard">
      {fetchError ? (
        <p>{fetchError}</p>
      ) : (
        <div className="singleleaderboard-first">
          <section className="singleleaderboard-first-companyLogo">
            <img src={`${fetchOne.logo}`} alt="" />
          </section>
          <section className="singleleaderboard-first-description">
            <h1 className="company-heading"> {fetchOne[0].name}</h1>
            <div className="company-bulletins">
              <article className="company-bulletins-item">
                {" "}
                <img src={icon_medal} alt="" />
                <span>{fetchOne.medal}</span>
              </article>
              <article className="company-bulletins-item">
                {" "}
                <img src={icon_star} alt="" />
                <span>{fetchOne.points}</span>
              </article>
              <article className="company-bulletins-item">
                {" "}
                <img src={icon_people} alt="" />
                <span>{fetchOne.employeecount}</span>
              </article>
            </div>
            <p className="company-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec
              suscipit, erat a rhoncus cursus, orci dui varius augue, vel
              blandit augue magna ut orci. Pellentesque in lorem volutpat,
              blandit urna eu, laoreet magna. Pellentesque sed eros tellus.
            </p>
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
        {leaderboard.map((item, index) => (
          <section className="singleleaderboard-second-data" key={index}>
            <div className="author">
              <img className="author-image" src={user1} alt="" />
              <span>{item.username}</span>
            </div>
            <div>
              <img src={icon_star} alt="" />
              <span>{item.total_starts}</span>
            </div>
            <div>
              <img src={icon_fire} alt="aoo" />
              <span>{item.week_streaks}</span>
            </div>
            <div>
              <img src={icon_people} alt="" />
              <span>{item.groups_apart_of}</span>
            </div>
            <div className="activegroups">
              {item.most_active_group.map((mag, index) => (
                <span className="activegroups-outline" key={index}>
                  {mag}
                </span>
              ))}
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
              username={post.username}
              tag={post.tag}
              img1={post.img_main}
              img2={post.img_sec}
              img3={post.img_third}
              postTitle={post.postTitle}
              postText={post.postText}
              likes={post.likes}
            />
          ))}
        </article>
      </div>
    </div>
  );
};

export default SingleLeaderBoard;
