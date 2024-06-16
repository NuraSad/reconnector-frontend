import Avatar from "@mui/material/Avatar";
import user1 from "../../../assets/user1.png";
import "./Post.scss";
import img1 from "../../../assets/user1_main_img.png";
import img2 from "../../../assets/user1_sec_img.png";
import img3 from "../../../assets/user1_sec2_img.png";

// import { useState } from "react";

export default function Post() {
  return (
    <div className="post">
      <div className="post__user-info">
        <div className="post__user-info--userWrap">
          <Avatar alt="user" src={user1} />
          <div className="post__user-info--nameWrap">
            <h3 className="post__user-info--name">George Michael</h3>
            <h4 className="post__user-info--user">@trial_shredder </h4>
          </div>
        </div>

        <p className="post__user-info--tags">#Mountain Biking Squad</p>
      </div>
      <div className="post__images">
        <img className="post__images--main" alt="img1" src={img1} />
        <div className="post__images--col-2">
          <img className="post__images--sec--top" alt="img2" src={img2} />
          <img className="post__images--sec--bottom" alt="img3" src={img3} />
        </div>
      </div>
      <div className="post__info">
        <h2 className="post__info--title">title</h2>
        <p className="post__info--text">text</p>
      </div>
    </div>
  );
}
