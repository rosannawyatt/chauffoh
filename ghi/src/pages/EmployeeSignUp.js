import { useState, useContext, useEffect } from "react";
import { FormInputRequired } from "../components/Forms.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
function EmployeeSignUp() {
  const { setUserData } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { register, token } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = {};
    accountData.username = username;
    accountData.password = password;
    accountData.first_name = firstName;
    accountData.last_name = lastName;
    accountData.email = email;
    accountData.is_employee = true;
    // console.log(accountData);

    register(
      accountData,
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`
    );
    // navigate("/employee-login");
    // e.target.reset();
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
        });
        navigate("/employee-dashboard");
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
      handleUserData();
    }
  }, [token]);

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h5>Already Have An Account?</h5>
            <a href="/employee-login">Login</a>
            <h1 className="text-info">Employee Sign Up</h1>
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
              <button className="btn btn-info" type="submit" value="Register">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeSignUp;
