import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormInputRequired } from "../components/Forms";

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
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Enter Employee Code</h1>
            <form id="employee-code-form" onSubmit={(e) => handleSubmit(e)}>
              <FormInputRequired
                id="employee code"
                placeholder="Employee Code"
                labelText=""
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                type="text"
              />
              <button className="btn btn-warning" type="submit" value="code">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeRoutes;
