import Avatar from "@mui/material/Avatar";
import user1 from "../../../assets/user1.png";
import "./Post.scss";

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

        <p className="post__user-info--tags">tags</p>
      </div>
      <div className="post__images">
        <img />
      </div>
      <div className="post__info">
        <h2 className="post__info--title">title</h2>
        <p className="post__info--text">text</p>
      </div>
    </div>
  );
}
