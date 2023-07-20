import useToken from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";

const UserAlert = () => {
  const navigate = useNavigate();
  const { logout } = useToken();
  const { setUserData } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    logout();
  };

  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <>
      <h1>Not an employee</h1>
      <a href="/login">Click here to Log in</a>
    </>
  );
};

export default UserAlert;
