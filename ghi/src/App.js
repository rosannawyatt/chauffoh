import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp.js";
import EmployeeSignUp from "./pages/EmployeeSignUp.js";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import UserAlert from "./pages/UserAlert";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout";
import Nav from "./components/Nav.js";
import Main from "./pages/Main.js";
import About from "./pages/About.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import PrivateRoutes from "./utils/PrivateRoutes.js";
import EmployeeRoutes from "./utils/EmployeeRoutes.js";
import UserDashboard from "./pages/Dashboard.js";
import RideForm from "./pages/RideRequest.js";
import RideList from "./pages/RideList";
import RideListbyAccount from "./pages/RideListbyAccount";
import RideView from "./pages/RideView";
import RideCounter from "./components/RideCounter";
import FinalReceipt from "./pages/FinalReceipt.js";
import UserAccountDetails from "./pages/UserAccountDetails";
import EditAccountDetails from "./pages/EditAccountDetails";
import SideBarNav from "./components/SideBarNav";
import { useState } from "react";
import { UserContext } from "./components/UserContext";
import EmployeeCheck from "./utils/EmployeeCheck";

function App() {
  const [userData, setUserData] = useState(null);
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_USER_SERVICE_API_HOST}>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Nav userData={userData} />
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
            <div className="container">
              <div className="row">
                <SideBarNav userData={userData} />
                <div className="col-9">
                  <Routes>
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="login" element={<Login />} />
                    <Route
                      path="logout"
                      element={<Logout userData={userData} />}
                    />
                    <Route path="ride-counter" element={<RideCounter />} />
                    <Route element={<PrivateRoutes />}>
                      <Route path="dashboard">
                        <Route
                          path=""
                          element={<UserDashboard userData={userData} />}
                          exact
                        />
                        <Route
                          path="request"
                          element={<RideForm userData={userData} />}
                          exact
                        />
                        <Route
                          path="account/details"
                          element={<UserAccountDetails userData={userData} />}
                          exact
                        />
                        <Route
                          path="edit/account"
                          element={<EditAccountDetails userData={userData} />}
                          exact
                        />
                        <Route
                          path="account/rides"
                          element={<RideListbyAccount userData={userData} />}
                        />
                        <Route
                          path="account/rides/:id"
                          element={<RideView userData={userData} />}
                        />
                        <Route
                          path="account/rides/:id/receipt"
                          element={<FinalReceipt userData={userData} />}
                        />
                      </Route>
                    </Route>
                    <Route>
                      <Route
                        path="employee-portal"
                        element={<EmployeeRoutes />}
                      />
                      <Route
                        path="employee-signup"
                        element={<EmployeeSignUp />}
                      />
                      <Route
                        path="employee-login"
                        element={<EmployeeLogin />}
                      />
                      <Route element={<EmployeeCheck />}>
                        <Route path="employee-dashboard">
                          <Route
                            path=""
                            element={<EmployeeDashboard userData={userData} />}
                            exact
                          />
                          <Route
                            path="rides"
                            element={<RideList userData={userData} />}
                          />
                        </Route>
                      </Route>
                    </Route>
                    <Route path="useralert" element={<UserAlert />} />
                    <Route path="about" element={<About />} />
                  </Routes>
                </div>
              </div>
            </div>
          </UserContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
