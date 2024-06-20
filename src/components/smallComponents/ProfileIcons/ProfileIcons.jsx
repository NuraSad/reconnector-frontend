import "./ProfileIcons.scss";

export default function ProfileIcons({
  users,
  moveLeft,
  moveBottom,
  marginTop,
}) {
  return (
    <div
      className="profile-icons"
      style={{
        left: moveLeft,
        bottom: moveBottom,
        marginTop: marginTop,
      }}
    >
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
