import CurrentRides from "./CurrentRides";
import { SideBarNav } from "../components/SideBarNav";
import Footer from "../components/Footer";
const UserDashboard = ({ userData }) => {
  return (
    <>
      <div className="d-flex flex-row">
        <SideBarNav userData={userData} />
        <div className="container-fluid ubody p-3">
          <div className="user-table shadow p-3">
            <CurrentRides userData={userData} />
          </div>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
};
export default UserDashboard;
