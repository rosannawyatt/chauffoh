import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export default function Nav({ userData }) {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/request">Request a Ride</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/employee-portal">Employee Portal</NavLink>
        </li>
        <li>
          <NavLink to="/employee-dashboard">Employee Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/employee-dashboard/rides">Rides list</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/account/rides">Rides list by account</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/account/details/">Account</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}
