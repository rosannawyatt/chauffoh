import useToken from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useContext, useCallback } from "react";
import { UserContext } from "../components/UserContext.js";
import { NavLink } from "react-router-dom";

const Logout = () => {
  const { logout } = useToken();
  const { setUserData } = useContext(UserContext);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUserData(null);
    logout();
  }, [logout, setUserData]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <>
      <div className="row">
        <p className="text-danger">
          You have been successfully logged out. You will be redirected to the homepage
          shortly. If you are not redirected, click here: 
        </p>
        <NavLink to="/"> Home Page</NavLink>
      </div>
    </>
  );
};

export default Logout;
