
import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentList.css";
import { useNavigate, useLocation } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch all students from backend
  async function fetchStudents() {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/students"
      );

      setStudents(response.data);
      setError("");
    } catch (err) {
      setError("Unable to fetch student records.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch records when the page opens or is revisited
  useEffect(() => {
    fetchStudents();
  }, [location.key]);

  // Delete student with confirmation
  async function handleDelete(studentId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/students/${encodeURIComponent(studentId)}`
      );

      // Update frontend automatically
      setStudents((prev) =>
        prev.filter(
          (student) => student.studentId !== studentId
        )
      );

      alert("Student deleted successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to delete student."
      );
    }
  }

  // Navigate to edit page
  function handleEdit(student) {
    navigate(
      `/edit-student/${encodeURIComponent(student.studentId)}`,
      { state: { student } }
    );
  }

  // Search by Student ID or Name
  const filteredStudents = students.filter((student) => {
    const query = search.trim().toLowerCase();

    return (
      String(student.studentId)
        .toLowerCase()
        .includes(query) ||
      student.name
        .toLowerCase()
        .includes(query)
    );
  });

  if (loading) {
    return (
      <p className="list-message">
        Loading students...
      </p>
    );
  }

  if (error) {
    return (
      <p className="list-error">
        {error}
      </p>
    );
  }

  return (
    <div className="student-list-container">
      <h1>All Students</h1>

      <p className="list-subtitle">
        View, search, edit and manage student records.
      </p>

      {/* Search box */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Student ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-search-btn"
            onClick={() => setSearch("")}
            type="button"
          >
            Clear
          </button>
        )}
      </div>

      {students.length === 0 ? (
        <div className="empty-message">
          <h3>No students found</h3>
          <p>
            No student records are available.
            Please add a student first.
          </p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-message">
          <h3>No matching students</h3>
          <p>
            Try another Student ID or Name.
          </p>
        </div>
      ) : (
        <>
          <p className="result-count">
            Showing {filteredStudents.length} of {students.length} students
          </p>

          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>Semester</th>
                  <th>Mobile Number</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.branch}</td>
                    <td>{student.semester}</td>
                    <td>{student.mobileNumber}</td>

                    <td className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(student.studentId)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentList;