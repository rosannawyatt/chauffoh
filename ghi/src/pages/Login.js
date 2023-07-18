import useToken from "@galvanize-inc/jwtdown-for-react";
import { FormInputRequired } from "../components/Forms.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();
  const navigate = useNavigate();
  const {userData, setUserData} = useContext(UserContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      e.target.reset();
    } catch (err) {
      e.target.reset();
    }
  };

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
          })
          navigate("/dashboard");
        } else {
          // Handle error
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

  useEffect(() => {
    if (token) {
      handleUserData()
      ;
    }
  }, [token]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Login</h1>
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
              placeholder="password"
              labelText="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button className="btn btn-primary" type="submit" value="Login">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
