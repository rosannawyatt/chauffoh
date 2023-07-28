import { useState, useEffect, useContext } from "react";
import { FormInputRequired } from "../components/Forms.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/UserContext.js";
import tesla from "../images/tesla.jpeg";
import Footer from "../components/Footer";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { register, token } = useToken();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
      is_employee: false,
    };

    register(
      accountData,
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts`
    );
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
    }
  }, [token, navigate, setUserData]);

  return (
    <>
      <div className="container-fluid">
        <div className="page-body">
          <div className="row align-items-stretch">
            <div className="col-lg-7 p-0 d-flex align-items-center">
              <img
                style={{ width: "100%", height: "100%" }}
                src={tesla}
                alt="car-signup"
              />
            </div>
            <div className="col-lg-5 p-5">
              <div className="float-right">
                <h6>Already Have An Account?</h6>
                <Link to="/login" className="float-right text-second-color">
                  Login
                </Link>
              </div>
              <h2 className="text-color-primary">Sign Up</h2>
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
                <button className="button-primary" type="submit" value="Register">
                  Create
                </button>
              </form>
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

export default SignUp;
