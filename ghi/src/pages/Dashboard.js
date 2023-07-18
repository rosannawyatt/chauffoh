import RideView from "./RideView";
import RideListbyAccount from "./RideListbyAccount";
import CurrentRides from "./CurrentRides";
const UserDashboard = ({ userData }) => {
  return (
    <>
      <h1>
        Hi, {userData.first_name} {userData.last_name}
      </h1>
      <p>username: {userData && userData.username}</p>
      <p>id: {userData && userData.id}</p>
      <CurrentRides userData={userData} />
      <RideListbyAccount userData={userData} />
    </>
  );
};
export default UserDashboard;
