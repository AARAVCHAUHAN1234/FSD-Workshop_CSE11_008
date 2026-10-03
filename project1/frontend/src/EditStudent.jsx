
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./EditStudent.css";

const API = "http://localhost:5000/students";

function EditStudent() {
  const { studentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [student, setStudent] = useState(
    location.state?.student || null
  );
  const [loading, setLoading] = useState(!location.state?.student);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Load existing student details if opened directly
  useEffect(() => {
    if (student) return;

    async function fetchStudent() {
      try {
        const response = await axios.get(API);

        const found = response.data.find(
          (s) => s.studentId === studentId
        );

        if (found) {
          setStudent(found);
        } else {
          setMessage("Student not found.");
          setMessageType("error");
        }
      } catch (error) {
        setMessage("Unable to load student details.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [studentId, student]);

  function handleChange(e) {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!/^\d{10}$/.test(student.mobileNumber)) {
      setMessage("Mobile number must contain exactly 10 digits.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.put(
        `${API}/${encodeURIComponent(studentId)}`,
        {
          name: student.name,
          email: student.email,
          branch: student.branch,
          semester: Number(student.semester),
          mobileNumber: student.mobileNumber
        }
      );

      setMessage(response.data.message);
      setMessageType("success");

      // Return to the list after a successful update
      setTimeout(() => {
        navigate("/students", { state: { updated: true } });
      }, 700);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to update student."
      );
      setMessageType("error");
    }
  }

  if (loading) {
    return <p className="edit-message">Loading student details...</p>;
  }

  if (!student) {
    return (
      <div className="edit-container">
        <p className="edit-error">{message || "Student not found."}</p>
        <Link to="/students">Back to student list</Link>
      </div>
    );
  }

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h1>Update Student</h1>
        <p className="edit-subtitle">
          Modify the student details below.
        </p>

        {message && (
          <p className={`edit-message ${messageType}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Student ID</label>
          <input
            type="text"
            value={student.studentId}
            readOnly
          />

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />

          <label>Branch</label>
          <select
            name="branch"
            value={student.branch}
            onChange={handleChange}
            required
          >
            <option value="CSE">CSE</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>

          <label>Semester</label>
          <select
            name="semester"
            value={student.semester}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={student.mobileNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />

          <button type="submit" className="update-btn">
            Save Changes
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/students")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;