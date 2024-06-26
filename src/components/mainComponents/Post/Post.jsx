import Avatar from "@mui/material/Avatar";
import "./Post.scss";
import heart from "/heart_icon.svg";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import supabase from "../../../config/supabaseClient";
export default function Post({
  profileAvatar,
  last_name,
  first_name,
  username,
  tag,
  img1,
  postTitle,
  postText,
  likes,
  id
}) {


  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(() => {
    // Initialize isLiked from session storage if it exists
    const savedIsLiked = sessionStorage.getItem(`isLiked_${id}`);
    return savedIsLiked ? JSON.parse(savedIsLiked) : false;
  });
  
  
  useEffect(() => {
    // Update session storage whenever isLiked changes
    sessionStorage.setItem(`isLiked_${id}`, JSON.stringify(isLiked));
  }, [isLiked, id]);
  
  const handleLike = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
  
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);
  
    const { data, error } = await supabase
      .from("post")
      .update({ likes: newLikeCount })
      .eq("id", id);
  
    if (error) {
      setLikeCount(likeCount); // Revert to the old count
      setIsLiked(isLiked); // Revert to the old like state
    }
  };
  
  
  

  return (
    <div className="post">
      <div className="post__user-info">
        <div className="post__user-info--userWrap">
          <Avatar alt={username} src={profileAvatar} />
          <div className="post__user-info--nameWrap">
            <h3 className="post__user-info--name">
              {first_name} {last_name}
            </h3>
            <h4 className="post__user-info--user">@{username} </h4>
          </div>
        </div>

        <p className="post__user-info--tags">#{tag}</p>
      </div>
      <div className="post__images">
        <img className="post__images--main" alt="main image" src={img1} />
        <div className="post__images--col-2">
          <div className="post__info--col-1">
            <h2 className="post__info--title">{postTitle}</h2>
            <p className="post__info--text">{postText}</p>
          </div>
        </div>
      </div>
      <div className="post__info">
        <div className="post__info--col-2">
          <div className="post__info--col-2--wrapper">
            <p className="post__info--col-2--p" unselectable="on" onClick={handleLike}>{likeCount}</p>
            <img className="post__info--col-2--svg" alt={heart} src={heart} style={{ filter: isLiked ? "none" : "brightness(50%)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  profileAvatar: PropTypes.string,
  last_name: PropTypes.string,
  first_name: PropTypes.string,
  username: PropTypes.string,
  tag: PropTypes.array,
  img1: PropTypes.string,
  img2: PropTypes.string,
  img3: PropTypes.string,
  postTitle: PropTypes.string,
  postText: PropTypes.string,
  // likes: PropTypes.num,
};
