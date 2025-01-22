import { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const [formTitle, setFormTitle] = useState("Add Department");

  const { id } = useParams();

  const navigator = useNavigate();

  function saveDepartment(e) {
    e.preventDefault();

    const department = { departmentName, departmentDescription };

    if (id) {
      updateDepartment(id, department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => console.error(error));
    } else {
      createDepartment(department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    getDepartmentById(id)
      .then((response) => {
        setDepartmentName(response.data.departmentName);
        setDepartmentDescription(response.data.departmentDescription);
      })
      .catch((error) => console.error(error));

    if (id) {
      setFormTitle("Update Department");
    } else {
      setFormTitle("Add Department");
    }
  }, [id]);
  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">{formTitle}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="departmentName" className="form-label">
                  Department Name:
                </label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="departmentDescription" className="form-label">
                  Department Description:
                </label>
                <input
                  type="text"
                  name="departmentDescription"
                  placeholder="Enter Department Description"
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className="form-control"
                />
              </div>

              <button
                className="btn btn-success mb-2"
                onClick={(e) => saveDepartment(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
