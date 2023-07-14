const UserDashboard = ({ userData }) => {
  return (
    <>
      <h1>
        Hi, {userData.first_name} {userData.last_name}
      </h1>
      <p>username: {userData && userData.username}</p>
      <p>id: {userData && userData.id}</p>
    </>
  );
};
export default UserDashboard;
