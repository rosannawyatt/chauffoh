// import { useState, useEffect } from "react";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const loadEmployees = async () => {
//     const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/employees`;
//     const response = await fetch(url);
//     if (!response.ok) {
//       console.log("error with fetch");
//     } else {
//       const data = await response.json();
//       setEmployees(data);
//     }
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   return (
//     <>
//       <div className="container-fluid p-3 mt-4">
//         <h2>Current Employees</h2>
//         <table className="table table-sm table-responsive">
//           <thead className="thead-dark">
//             <tr>
//               <th>Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => {
//               return (
//                 <tr key={employee.id}>
//                   <td>
//                     {employee.first_name} {employee.last_name}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default EmployeeList;

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
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/employees/`;
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
      <div className="container-fluid p-3 mt-4">
        <h2>Employees With Current Rides</h2>
        <table className="table table-sm table-responsive">
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
            <div className="container-fluid p-3 mt-4">
        <h2>All Employees</h2>
        <table className="table table-sm table-responsive">
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
