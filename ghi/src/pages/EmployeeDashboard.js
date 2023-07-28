import RideList from "./RideList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EmployeeList from "../components/EmployeeList";
import UserList from "../components/UserList";
import { Tabs } from "antd";
import Footer from "../components/Footer";

const EmployeeDashboard = ({ userData }) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: `Rides`,
      children: <RideList userData={userData} />,
    },

    {
      key: "2",
      label: `Employee list`,
      children: <EmployeeList />,
    },
    {
      key: "3",
      label: `User list`,
      children: <UserList />,
    },
  ];

  useEffect(() => {
    const employeeCheck = () => {
      if (userData.is_employee === false) {
        navigate("/useralert");
      }
    };

    employeeCheck();
  }, [userData, navigate]);
  return (
    <>
      <div className="container-fluid">
        <div className="row p-3">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
};
export default EmployeeDashboard;
