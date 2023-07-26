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
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              {" "}
              Hi, {userData.first_name}
            </a>
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

// import { NavLink } from "react-router-dom";

// export default function SideBarNav({ userData }) {
//   if (userData === null) {
//     return <></>;
//   } else if (userData.is_employee === false) {
//     return (
//       <>
//         <div
//           className="col-2"
//           style={{
//             border: 5,
//             borderStyle: "solid",
//             backgroundColor: "#F7F3E8",
//             alignItems: "center",
//             borderRadius: 25,
//             borderColor: "#C4B691",
//             boxShadow: "2px 2px 9px #111111",
//             paddingBottom: 100,
//           }}
//         >
//           <div
//             className="row"
//             style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 10 }}
//           >
//             <div style={{ textAlign: "center" }}>
//               <h2>User</h2>
//             </div>
//           </div>
//           <div
//             className="row"
//             style={{ paddingLeft: 20, paddingTop: 10, paddingRight: 20 }}
//           >
//             <ul className="list-group" style={{ width: "100%" }}>
//               <li
//                 className="list-group-item"
//                 style={{
//                   borderRadius: 25,
//                   textAlign: "center",
//                   backgroundColor: "#FFFFFF",
//                 }}
//               >
//                 <NavLink
//                   style={{ color: "#08797E", fontSize: 20, fontWeight: "bold" }}
//                   to="/dashboard/"
//                 >
//                   Dashboard
//                 </NavLink>
//               </li>
//               <li
//                 className="list-group-item"
//                 style={{
//                   borderRadius: 25,
//                   textAlign: "center",
//                   backgroundColor: "#FFFFFF",
//                 }}
//               >
//                 <NavLink
//                   style={{ color: "#08797E", fontSize: 20, fontWeight: "bold" }}
//                   to="/dashboard/account/details/"
//                 >
//                   Account details
//                 </NavLink>
//               </li>
//               <li
//                 className="list-group-item"
//                 style={{
//                   borderRadius: 25,
//                   textAlign: "center",
//                   backgroundColor: "#FFFFFF",
//                 }}
//               >
//                 <NavLink
//                   style={{ color: "#08797E", fontSize: 20, fontWeight: "bold" }}
//                   to="/dashboard/account/rides"
//                 >
//                   Rides History
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//           <div
//             className="row"
//             style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}
//           >
//             <div>
//               <h2>Services</h2>
//             </div>
//           </div>
//           <div
//             className="row"
//             style={{ paddingLeft: 20, paddingTop: 10, paddingRight: 20 }}
//           >
//             <ul className="list-group" style={{ width: "100%" }}>
//               <li
//                 className="list-group-item"
//                 style={{
//                   borderRadius: 25,
//                   textAlign: "center",
//                   backgroundColor: "#FFFFFF",
//                 }}
//               >
//                 <NavLink
//                   style={{ color: "#08797E", fontSize: 20, fontWeight: "bold" }}
//                   to="/dashboard/request"
//                 >
//                   Request a Ride
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div className="col">
//           <div className="row">Employees</div>
//           <li>
//             <NavLink to="/employee-dashboard">Dashboard</NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/account/details/">Account details</NavLink>
//           </li>
//           <li>
//             <NavLink to="/employee-dashboard/rides">Rides list</NavLink>
//           </li>
//         </div>
//       </>
//     );
//   }
// }
