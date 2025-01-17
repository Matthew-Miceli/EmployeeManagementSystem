import { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import DeleteComponent from "./DeleteComponent";
const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = (id) => {
    // Update the employees state by filtering out the deleted employee
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <table className="table-striped table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <DeleteComponent id={employee.id} onDelete={handleDelete}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
