import { NavLink } from "react-router-dom";
import wheelLogo from "../images/white-wheel-small.webp";

export default function Nav({ userData }) {
  if (userData === null) {
    return (
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ backgroundColor: "#08797E" }}
      >
        <div className="container-fluid">
          <NavLink to="/">
             <img src={wheelLogo} alt="steering wheel logo" width={80} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                to="/employee-portal"
              >
                Employee Portal
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-body-tertiary"
          style={{ backgroundColor: "#08797E" }}
        >
          <div className="container-fluid">
            <NavLink to="dashboard/account/details/">
              <img src={wheelLogo} alt="steering wheel logo" width={80} />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav"></div>
            <ul className="navbar-nav">
              <li>
                <NavLink
                  className="nav-link"
                  style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                  to="/about"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="nav-link"
                  style={{ color: "#F7F3E8", fontSize: 20, fontWeight: "bold" }}
                  to="/logout"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
