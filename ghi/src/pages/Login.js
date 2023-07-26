import useToken from "@galvanize-inc/jwtdown-for-react";
import { FormInputRequired } from "../components/Forms.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
import drivingImg from "../images/driving.jpeg";
import Footer from "../components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      e.target.reset();
    } catch (err) {
      e.target.reset();
    }
  };

  useEffect(() => {
    const handleUserData = async () => {
      try {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          const {
            id,
            username,
            first_name,
            last_name,
            email,
            is_employee,
            current_ride,
          } = data.account;
          const userData = {
            id,
            username,
            first_name,
            last_name,
            email,
            is_employee,
            current_ride,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          setUserData(userData);
          navigate("/dashboard");
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      handleUserData();
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    }
  }, [token, setUserData, navigate]);

  return (
    <>
      <div className="container-fluid">
        <div className="row align-items-stretch">
          <div className="col-lg-7 p-0 d-flex align-items-center">
            <img
              style={{ width: "100%", height: "100%" }}
              src={drivingImg}
              alt="drive-login"
            />
          </div>
          <div className="col-lg-5 p-5 d-flex flex-column justify-content-center">
            <div className="text-right">
              <h6>Create an Account</h6>
              <Link to="/signup" className="float-right">
                Sign Up
              </Link>
            </div>
            <h2>Login</h2>
            <form id="login-account-form" onSubmit={(e) => handleSubmit(e)}>
              <FormInputRequired
                id="username"
                placeholder="username"
                labelText="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
              <FormInputRequired
                id="password"
                placeholder="********"
                labelText="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <button className="button-primary" type="submit" value="Login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
};

export default Login;
