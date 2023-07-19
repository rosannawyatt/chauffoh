import { useState, useEffect } from "react";

const EmployeeList = () => {
    const[employees, setEmployees] = useState([])
    const loadEmployees = async () =>{
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/employees`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log("error with fetch");
        } else {
            const data = await response.json();
            setEmployees(data);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    return(
        <>
            <div>
                <h2>
                    Current Employees
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            return (
                                <tr key={employee.id}>
                                    <td>{employee.first_name} {employee.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmployeeList