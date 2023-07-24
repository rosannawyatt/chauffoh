import useToken from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useContext, useCallback } from "react";
import { UserContext } from "../components/UserContext.js";

const Logout = () => {
  const { logout } = useToken();
  const { setUserData } = useContext(UserContext);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUserData(null);
    logout();
  }, [logout, setUserData]);

  const logoutRedirect = () => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return (
    <>
      <div className="row">
        <p className="text-danger">
          You have been successfully logged out. You will be redirected to login
          shortly. If you are not redirected, click here:
        </p>
        <a href="/login"> Login </a>
        {logoutRedirect()}
      </div>
    </>
  );
};

export default Logout;
