import RideList from "./RideList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmployeeList from "../components/EmployeeList";

const EmployeeDashboard = ({ userData }) => {
  const navigate = useNavigate();

  const employeeCheck = () => {
    if (userData.is_employee === false) {
      navigate("/useralert");
    }
  };

  useEffect(() => {
    employeeCheck();
  }, []);
  return (
    <>
      <h1>EMPLOYEE ONLY</h1>
      <p>username: {userData && userData.username}</p>
      <p>id: {userData && userData.id}</p>
      <RideList userData={userData} />
      <EmployeeList />
    </>
  );
};
export default EmployeeDashboard;
