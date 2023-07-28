import useToken from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useContext, useCallback } from "react";
import { UserContext } from "../components/UserContext.js";
import Footer from "../components/Footer";

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
      <div className="logout-body">
        <div className="row" style={{width: "100%"}}>
          <p className="text-danger text-center mt-3" style={{paddingBottom: "25%", width: "100%"}}>
            You have been successfully logged out.
          </p>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Logout;
