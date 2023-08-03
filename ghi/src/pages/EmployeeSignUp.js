import { useState, useContext, useEffect } from "react";
import { FormInputRequired } from "../components/Forms.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
import Footer from "../components/Footer";
import drivingImg from "../images/cityscape.webp";

function EmployeeSignUp() {
  const { setUserData } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { register, token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserData = async () => {
      try {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const { id, username, first_name, last_name, email, is_employee } =
            data.account;
          setUserData({
            id,
            username,
            first_name,
            last_name,
            email,
            is_employee,
          });
          navigate("/employee-dashboard");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      handleUserData();
    }
  }, [token, navigate, setUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
      is_employee: true,
    };

    register(
      accountData,
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="page-body">
          <div className="row align-items-stretch">
            <div className="col-lg-5 p-0 d-flex flex-column justify-content-center">
              <div className="shadow p-5">
                <div className="mt-1">
                  <h6 className="mb-0">Already Have An Account?</h6>
                  <NavLink
                    to="/employee-login"
                    className="float-right text-color-primary"
                  >
                    Login
                  </NavLink>
                </div>
                <div>
                  <h2 className="text-second-color  mt-3">Employee Sign Up</h2>
                  <form onSubmit={handleSubmit} id="create-account-form">
                    <FormInputRequired
                      id="first_name"
                      placeholder="First"
                      labelText="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                    />
                    <FormInputRequired
                      id="last_name"
                      placeholder="Last"
                      labelText="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                    />
                    <FormInputRequired
                      id="email"
                      placeholder="you@example.com"
                      labelText="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                    <FormInputRequired
                      id="username"
                      placeholder="Username"
                      labelText="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                    />
                    <FormInputRequired
                      id="password"
                      placeholder="********"
                      labelText="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                    />
                    <button
                      className="ghost-button-second"
                      type="submit"
                      value="Register"
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-7 p-0 d-flex align-items-center">
              <img
                style={{ width: "100%", height: "100%" }}
                src={drivingImg}
                alt="drive-login"
              />
            </div>
          </div>
          <div className="row">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeSignUp;
