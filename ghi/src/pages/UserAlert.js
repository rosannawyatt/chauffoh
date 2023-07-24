import useToken from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useContext } from "react";
import { UserContext } from "../components/UserContext.js";

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
      <h1>Not an employee</h1>
      <a href="/login">Click here to Log in</a>
    </>
  );
};

export default UserAlert;
