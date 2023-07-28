import { useState, useEffect, useCallback } from "react";

const EmployeeList = () => {
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  const loadCurrentEmployees = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/employees/current`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const currentData = await response.json();
      setCurrentEmployees(currentData);
    }
  }, []);

  const loadAllEmployees = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/employees`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("error with fetch");
    } else {
      const allData = await response.json();
      setAllEmployees(allData);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await loadCurrentEmployees();
      await loadAllEmployees();
    };

    fetchData();
  }, [loadCurrentEmployees, loadAllEmployees]);
  return (
    <>
      <div className="container-fluid p-3 mt-4 table-responsive">
        <h2>Employees With Current Rides</h2>
        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>
                    {employee.last_name}, {employee.first_name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="container-fluid p-3 mt-4 table-responsive">
        <h2>All Employees</h2>
        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {allEmployees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>
                    {employee.last_name}, {employee.first_name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
