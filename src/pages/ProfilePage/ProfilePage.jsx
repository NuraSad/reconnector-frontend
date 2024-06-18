import "./ProfilePage.scss";
import Post from "../../components/mainComponents/Post/Post";
import samantha from '../../assets/samantha.png';

const user = {
    firstName: "Samantha",
    lastName: "Johnson",
    avatar: samantha,
    streak: 2,
    points: 183,
    email: "samatha@gmail.com",
    location: "Vancouver, BC, Canada"
}

export default function ProfilePage(){
    return (
        <div className="user-profile">
            <h1 className="user-profile__title page-font">Profile</h1>
            <div className="user-profile__container">
            <div className="top">
            <div className="avatar-field">
                <div className="stat">
                    <p>&#128293;</p>
                    <p>{user.streak}</p>
                </div>
                <img className="avatar" src={user.avatar} alt={`${user.firstName} avatar`}/>
                <div className="stat">
                    <p>&#127775;</p>
                    <p>{user.points}</p>
                </div>
            </div>
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                    <p className="email">{user.email}</p>
                    <p>{user.location}</p>
            </div>
            <div className="awards-field">
                <h3>Featured Awards</h3>
                <div className="award">
                    <img/>
                    <p>Awarded for the fastest completion time in a triathlon</p>
                </div>
            </div>
            <div className="groups-field">
                <h3>Most Active Groups</h3>
                <div className="mini-group">
                    <img/>
                    <p>name</p>
                </div>
            </div>
            <div className="posts-field">
                <h3>Recent Post</h3>
                <Post/>
            </div>
        </div>
        </div>
    )
}