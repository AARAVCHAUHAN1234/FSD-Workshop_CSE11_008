
import { useState } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
function StudentRegistration() {
  const [student, setStudent] = useState({
    studentId: "",
    name: "",
    email: "",
    branch: "CSE",
    semester: "",
    mobileNumber: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value
    });
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

    if (
      !Number.isInteger(Number(student.semester)) ||
      Number(student.semester) < 1 ||
      Number(student.semester) > 8
    ) {
      setMessage("Semester must be between 1 and 8.");
      setMessageType("error");
      return;
    }


try {
  const response = await axios.post(
    "http://localhost:5000/students",
    {
      ...student,
      semester: Number(student.semester)
    }
  );

  setMessage(response.data.message);
  setMessageType("success");

  setStudent({
    studentId: "",
    name: "",
    email: "",
    branch: "CSE",
    semester: "",
    mobileNumber: ""
  });

  // Redirect to homepage after successful registration
  navigate("/");

}  catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Student registration failed."
      );
      setMessageType("error");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Add Student</h1>

        {message && (
          <p className={`message ${messageType}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            placeholder="Enter student ID"
            value={student.studentId}
            onChange={handleChange}
            required
          />

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={student.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
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
            <option value="">Select semester</option>
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
            placeholder="Enter 10-digit mobile number"
            value={student.mobileNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />

          <button type="submit">
            Add Student
           
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistration;