import { Link } from "react-router-dom";
import { SideBarNav } from "../components/SideBarNav";
import Footer from "../components/Footer";
const UserAccountDetails = ({ userData }) => {
  return (
    <>
      <div className="d-flex flex-row">
        <SideBarNav userData={userData} />
        <div className="container-fluid ubody p-3">
          <h3>Account Details</h3>
          <div>
            <p>Username: {userData && userData.username}</p>
            <p>Email: {userData && userData.email}</p>
            <p>First Name: {userData && userData.first_name}</p>
            <p>Last Name: {userData && userData.last_name}</p>
            <p>
              Current Ride:
              {userData && userData.current_ride ? "Actve" : "No current rides"}
            </p>
          </div>
          <div>
            <Link to="/dashboard/edit/account">
              <button className="button button-primary">
                Edit Account Information
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
};
export default UserAccountDetails;
