import "./Explore.scss";
import Post from "../../components/mainComponents/Post/Post";
import { useState } from "react";
import postData from "../../data/postData.json";

export default function Explore() {
  const [posts] = useState(postData);
  return (
    <section className="explore">
      <h1 className="explore__title page-font">Explore</h1>
      <div className="explore__posts">
        {posts &&
          posts.map((i) => (
            <Post
              key={i.id}
              profileAvatar={i.profileAvatar}
              last_name={i.last_name}
              first_name={i.first_name}
              username={i.username}
              tag={i.tag}
              img1={i.img_main}
              img2={i.img_sec}
              img3={i.img_third}
              postTitle={i.postTitle}
              postText={i.postText}
              likes={i.likes}
            />
          ))}
      </div>
    </section>
  );
}
