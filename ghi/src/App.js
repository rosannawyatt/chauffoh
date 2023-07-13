import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import SignUp from "./pages/SignUp.js";
import Login from "./pages/Login.js";
import Nav from "./components/Nav.js";
import Main from "./pages/Main.js";
import About from "./pages/About.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import PrivateRoutes from "./utils/PrivateRoutes.js";
import UserDashboard from "./pages/Dashboard.js";
import RideForm from "./pages/RideRequest.js";

function App() {
  //   const [launchInfo, setLaunchInfo] = useState([]);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     async function getData() {
  //       let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
  //       console.log("fastapi url: ", url);
  //       let response = await fetch(url);
  //       console.log("------- hello? -------");
  //       let data = await response.json();

  //       if (response.ok) {
  //         console.log("got launch data!");
  //         setLaunchInfo(data.launch_details);
  //       } else {
  //         console.log("drat! something happened");
  //         setError(data.message);
  //       }
  //     }
  //     getData();
  //   }, []);

  // <ErrorNotification error={error} />
  // <Construct info={launchInfo} />

  return (
    <>
      <BrowserRouter>
        <AuthProvider baseUrl={process.env.REACT_APP_USER_SERVICE_API_HOST}>
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="signup" element={<SignUp />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route element={<PrivateRoutes />}>
                <Route path="dashboard" element={<UserDashboard />} exact />
                <Route path="request" element={<RideForm />} exact />
              </Route>
              <Route path="about" element={<About />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
