import "./Explore.scss";
import Post from "../../components/mainComponents/Post/Post";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function Explore() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function getPosts() {
      let { data: posts_data, error: posts_error } = await supabase
        .from("post")
        .select("*");

      if (posts_error) {
        console.error("Error fetching posts:", posts_error.message);
        return;
      }

      if (posts_data) {
        setPosts(posts_data);
      }
    }
    getPosts();
  }, []);

  // console.log(posts);
  return (
    <section className="explore">
      <h1 className="explore__title page-font">Explore</h1>
      <div className="explore__posts">
        {posts &&
          posts
            .reverse()
            .map((i) => (
              <Post
                key={i.id}
                id={i.id}
                profileAvatar={i.profileAvatar}
                last_name={i.last_name}
                first_name={i.first_name}
                username={i.created_by}
                tag={i.group_name}
                img1={i.image}
                postTitle={i.title}
                postText={i.body}
                likes={i.likes}
              />
            ))}
      </div>
    </section>
  );
}
