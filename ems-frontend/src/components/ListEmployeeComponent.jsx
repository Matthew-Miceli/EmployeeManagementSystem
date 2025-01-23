import { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import DeleteComponent from "./DeleteComponent";
import { getDepartmentById } from "../services/DepartmentService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listEmployees()
      .then(async (response) => {
        const employeesWithDepartment = await Promise.all(
          response.data.map(async (employee) => {
            const department = await getDepartmentById(employee.departmentId);
            return {
              ...employee,
              departmentName: department.data.departmentName,
            };
          })
        );
        setEmployees(employeesWithDepartment);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleDelete = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={addNewEmployee}
      >
        Add Employee
      </button>
      <table className="table-striped table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.departmentName}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <DeleteComponent id={employee.id} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
