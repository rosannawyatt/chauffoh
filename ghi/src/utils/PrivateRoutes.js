import { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const PrivateRoutes = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (!userData && savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    setIsLoading(false);
  }, [userData, setUserData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userData === null) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
