import "./Explore.scss";
import Post from "../../components/mainComponents/Post/Post";

export default function Explore() {
  return (
    <section className="explore">
      <h1 className="explore__title page-font">Explore</h1>
      <div className="explore__posts">
        <Post />
      </div>
    </section>
  );
}
