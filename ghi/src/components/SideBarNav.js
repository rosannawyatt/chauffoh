import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

function SideBarNav({ userData }) {
  return (
    <>
      <div
        className={`app`}
        style={{
          flexDirection: "column",
          height: "100% vh",
          overflow: "scroll initial",
        }}
      >
        <CDBSidebar textColor="#f6f6f6" backgroundColor="#08797e">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              {" "}
              Hi, {userData.first_name}
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                to="/dashboard/"
                className={({ isActive }) =>
                  isActive ? "activeClicked" : "none"
                }
              >
                <CDBSidebarMenuItem icon="columns">
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/dashboard/account/rides"
                className={({ isActive }) =>
                  isActive ? "activeClicked" : "none"
                }
              >
                <CDBSidebarMenuItem icon="calendar">
                  Ride History
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/dashboard/account/details/"
                className={({ isActive }) =>
                  isActive ? "activeClicked a" : "none"
                }
              >
                <CDBSidebarMenuItem icon="user">Account</CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/dashboard/request"
                className={({ isActive }) =>
                  isActive ? "activeClicked" : "none"
                }
              >
                <CDBSidebarMenuItem icon="car">
                  Request a Ride
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </>
  );
}

function SideBarNavEmployee({ userData }) {
  return (
    <>
      <li>
        <NavLink to="/employee-dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/account/details/">Account details</NavLink>
      </li>
      <li>
        <NavLink to="/employee-dashboard/rides">Rides list</NavLink>
      </li>
    </>
  );
}

export { SideBarNav, SideBarNavEmployee };
