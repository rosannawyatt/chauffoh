import { NavLink } from "react-router-dom";


export default function Nav({ userData }) {
  if (userData === null){
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#08797E"}}>
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
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/employee-portal">Employee Portal</NavLink>
        </li>
      </ul>
    </nav>
  );
  } else {
    return (
      <>
      <div className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#08797E"}}>
          <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
    </div>
    </>
    )
  }
}
