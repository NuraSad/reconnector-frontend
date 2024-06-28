import Avatar from "@mui/material/Avatar";
import "./Post.scss";
import heart from "/heart_icon.svg";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
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
  id,
}) {
  const [fetchError, setFetchError] = useState("");
  const [likeCount, setLikeCount] = useState(likes);
  const [thisAuthor, setThisAuthor] = useState({});
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(() => {
    // Initialize isLiked from session storage if it exists
    const savedIsLiked = sessionStorage.getItem(`isLiked_${id}`);
    return savedIsLiked ? JSON.parse(savedIsLiked) : false;
  });

  console.log(thisAuthor);
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

  // username is the id
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data: userInfo, error: userInfoError } = await supabase
          .from("user")
          .select("avatar, first_name, last_name, username")
          .eq("id", username);
        if (userInfoError) {
          setFetchError("Cannot fetch the Users joined");
          // console.log(userInfoError);
          return;
        }
        console.log(userInfo);
        setThisAuthor(userInfo[0] || {});
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserInfo();
  }, [username]);

  return (
    <div className="post">
      <div className="post__user-info">
        <div className="post__user-info--userWrap">
          <div className="post__user-info-group">
            <Avatar alt={username} src={thisAuthor.avatar} />
            <div className="post__user-info--nameWrap">
              <h3 className="post__user-info--name">
                {thisAuthor.first_name} {thisAuthor.last_name}
              </h3>
            </div>
          </div>
          <div className="post__info--col-2--wrapper">
            <p
              className="post__info--col-2--p"
              unselectable="on"
              onClick={handleLike}
            >
              {likeCount}
            </p>
            <img
              className="post__info--col-2--svg"
              alt={heart}
              src={heart}
              style={{ filter: isLiked ? "none" : "brightness(50%)" }}
            />
          </div>
        </div>
      </div>
      <div className="post__images">
        <img className="post__images--main" alt="main image" src={img1} />
        <div className="post__images--col-2">
            <h2 className="post__info--title">{postTitle}</h2>
          <div className="post__info--col-1">
            {postText.length > 150 && !showFullText ? (
              <>
                <p className="post__info--text">
                  {postText.slice(0, 150)}...
                </p>
                <div className="post__info--wrap">
                <button
                  className="post__info--read-more"
                  onClick={() => setShowFullText(true)}
                >
                  Read More
                </button>
                <p className="post__user-info--tags">#{tag}</p>
              </div>
              </>
            ) : (
              <>
                <p className="post__info--text">{postText}</p>
                <div className="post__info--wrap">
                {postText.length > 150 ?( 
                  <button
                    className="post__info--read-more"
                    onClick={() => setShowFullText(false)}
                  >
                    Hide
                  </button>): <div></div>}
                  <p className="post__user-info--tags">#{tag}</p>
                </div>
              </>
            )}
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
