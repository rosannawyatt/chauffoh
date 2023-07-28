import useToken from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useContext } from "react";
import { UserContext } from "../components/UserContext.js";
import Footer from "../components/Footer";

const UserAlert = () => {
  const { logout } = useToken();
  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear();
      setUserData(null);
      logout();
    };

    handleLogout();
  }, [logout, setUserData]);

  return (
    <>
      <div className="container-fluid">
        <div className="page-body">
          <h1>You are not an employee and have been logged out.</h1>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
};

export default UserAlert;
