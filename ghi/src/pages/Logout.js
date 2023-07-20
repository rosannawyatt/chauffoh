import useToken from "@galvanize-inc/jwtdown-for-react";
import { FormInputRequired } from "../components/Forms.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useToken();
  const { setUserData } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    logout();
  };

  const logoutRedirect = () => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  useEffect(() => {
    handleLogout();
  }, []);

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
