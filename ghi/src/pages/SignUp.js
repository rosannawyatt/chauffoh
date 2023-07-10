import { useState } from "react";
import { FormInputRequired, FormInputOptional } from "../components/Forms.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const { register, token} = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = {};
    accountData.username = username;
    accountData.password = password;
    accountData.first_name = firstName;
    accountData.last_name = lastName;
    accountData.email = email;
    accountData.is_employee = isEmployee;
    console.log(accountData);

    register(
      accountData,
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`
    );
    console.log(token)
    e.target.reset();
    navigate("/");
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit} id="create-account-form">
              <FormInputRequired
                id="first_name"
                placeholder="Diana"
                labelText="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
              <FormInputRequired
                id="last_name"
                placeholder="Tran"
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
                placeholder="dtran1"
                labelText="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
              <FormInputRequired
                id="password"
                placeholder="secret password"
                labelText="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <FormInputOptional
                id="employee"
                placeholder="Employee"
                labelText="Are you an employee?"
                value={isEmployee}
                onChange={(e) => setIsEmployee(e.target.value)}
                type="checkbox"
              />
              <button
                className="btn btn-primary"
                type="submit"
                value="Register"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
