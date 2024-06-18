import "./ProfileIcons.scss";

export default function ProfileIcons({ users }) {
  return (
    <div className="profile-icons">
      {users.slice(0, 5).map((user) => (
        <img
          alt={`${user.name}`}
          src={user.src}
          className="profile-icons__icon"
          key={user.id}
        />
      ))}
      <div className="profile-icons__count">{users.length - 4}+</div>
    </div>
  );
}
