import RideView from "./RideView";
import RideListbyAccount from "./RideListbyAccount";
<<<<<<< HEAD
const UserDashboard = ({ userData }) => {
=======
import CurrentRides from "./CurrentRides";
const UserDashboard = ({ userData }) => {


>>>>>>> main
  return (
    <>
      <CurrentRides userData={userData} />
      <h1>
        Hi, {userData.first_name} {userData.last_name}
      </h1>
      <p>username: {userData && userData.username}</p>
      <p>id: {userData && userData.id}</p>
    </>
  );
};
export default UserDashboard;
