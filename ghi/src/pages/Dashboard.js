import CurrentRides from "./CurrentRides";
const UserDashboard = ({ userData }) => {
  console.log("userData", userData);
  return (
    <>
      <div style={{ padding: 20 }}>
        <div>
          <p className="greeting">
            Hi, {userData.first_name} {userData.last_name}
          </p>
        </div>
        <div className="table-back">
          <CurrentRides userData={userData} />
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
