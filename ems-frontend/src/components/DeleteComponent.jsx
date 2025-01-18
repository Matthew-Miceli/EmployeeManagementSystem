import PropTypes from "prop-types";
import { deleteEmployee } from "../services/EmployeeService";

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    onDelete(id);
    deleteEmployee(id);
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Ensure id is a string or number
  onDelete: PropTypes.func.isRequired, // Ensure onDelete is a function
};

export default DeleteButton;
