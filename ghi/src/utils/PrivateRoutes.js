import { Outlet, Navigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";
const PrivateRoutes = () => {
    const {userData, setUserData} = useContext(UserContext
    )
      if (userData === null) {
        return <Navigate to="/"/>
      } else {
        return < Outlet/>
      }
  // let auth = useToken();
  // return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
