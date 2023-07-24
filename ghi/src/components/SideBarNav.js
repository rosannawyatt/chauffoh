import { NavLink } from "react-router-dom";

export default function SideBarNav({ userData }) {
  if (userData === null){
  return (
    <></>
  );
  } else if (userData.is_employee === false){
    return (
      <>

    <div className='col-2'>
        <div className='row'>
            <div><h2>User</h2></div>
            <div>
        <li>
          <NavLink to="/dashboard/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/account/details/">Account details</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/account/rides">Rides History</NavLink>
        </li>
        </div>
        </div>
        <div className='row'>
            <div><h2>Services</h2></div>
            <div>
            <li>
            <NavLink to="/dashboard/request">Request a Ride</NavLink>
            </li>
            </div>
        </div>
    </div>
    </>
    )
  } else {
    return (
      <>
    <div className='col'>
        <div className='row'>Employees</div>
        <li>
          <NavLink to="/employee-dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/account/details/">Account details</NavLink>
        </li>
        <li>
          <NavLink to="/employee-dashboard/rides">Rides list</NavLink>
        </li>
        <div className='row'>Services</div>
        <li>
          <NavLink to="/dashboard/request">Request a Ride</NavLink>
        </li>
    </div>
    </>
    )
  }
}
