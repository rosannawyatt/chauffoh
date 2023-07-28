import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormInputRequired } from "../components/Forms";
import driver from "../images/driver.jpeg";
import Footer from "../components/Footer";

const EmployeeRoutes = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  let code = "code";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employeeCode === code) {
        navigate("/employee-signup");
      }
      e.target.reset();
    } catch (err) {
      e.target.reset();
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="page-body">
          <div className="row align-items-stretch">
            <div className="col-lg-5 p-5 d-flex flex-column justify-content-center">
              <div className="p-4">
                <h2 className="text-second-color">Enter Employee Code</h2>
                <form id="employee-code-form" onSubmit={(e) => handleSubmit(e)}>
                  <FormInputRequired
                    id="employee code"
                    placeholder="Employee Code"
                    labelText=""
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                    type="text"
                  />
                  <button
                    className="ghost-button-second"
                    type="submit"
                    value="code"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-7 p-0 d-flex align-items-center">
              <img
                style={{ width: "100%", height: "100%" }}
                src={driver}
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
};

export default EmployeeRoutes;
