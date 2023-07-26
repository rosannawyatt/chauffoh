import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";

const EmployeeCheck = () => {
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

  if (userData === null || userData.is_employee === false) {
    return <Navigate to="/useralert" />;
  } else {
    return <Outlet />;
  }
};

export default EmployeeCheck;
