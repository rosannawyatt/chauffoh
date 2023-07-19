import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { FormInputRequired, FormInputOptional } from "../components/Forms";
import { UserContext } from "../components/UserContext";




  const EmployeeCheck = () => {
      const {userData, setUserData} = useContext(UserContext
    )
      if (userData.is_employee === false) {
        return <Navigate to="useralert"/>
      } else {
        return < Outlet/>
      }
      }




export default EmployeeCheck;
