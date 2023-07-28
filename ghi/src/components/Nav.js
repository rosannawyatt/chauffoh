import { NavLink } from "react-router-dom";
import wheelTealLogo from "../images/Chauffoh-wheel-teal.png";

export default function Nav({ userData }) {
  if (userData === null) {
    return (
      <div>
        <div className="nbody">
          <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="container-fluid">
              <NavLink to="/">
                <img src={wheelTealLogo} alt="steering wheel logo" width={50} />
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
              <div className="collapse navbar-collapse" id="navbarNav">
                {" "}
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/signup"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/employee-portal"
                    >
                      Employee Portal
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  } else {
    if (userData && userData.is_employee) {
      return (
        <>
          <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "transparent", fontWeight: "500" }}
          >
            <div className="container-fluid">
              <img
                src={wheelTealLogo}
                alt="steering wheel logo"
                width={50}
                className="navbar-brand"
              />
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
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "transparent", fontWeight: "500" }}
          >
            <div className="container-fluid">
              <NavLink to="dashboard/account/details/">
                <img
                  src={wheelTealLogo}
                  alt="steering wheel logo"
                  width={50}
                  className="navbar-brand"
                />
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
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={{ color: "#08797e", fontSize: 18 }}
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
    }
  }
}
