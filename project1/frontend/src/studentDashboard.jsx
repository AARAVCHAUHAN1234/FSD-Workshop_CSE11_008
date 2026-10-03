
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

function StudentDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/students"
        );

        setStudentCount(res.data.length);
        setRecentStudents(res.data.slice(-3).reverse());
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-content">
        {/* Page heading */}
        <div style={{ marginBottom: "24px" }}>
          <h1 className="page-title">Student Dashboard</h1>
          <p className="page-subtitle">
            Manage enrollments, view records and monitor activity.
          </p>
        </div>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* Student count */}
            <div className="glass-card" style={{ marginBottom: "24px" }}>
              <h2>Total Students</h2>
              <h1>{studentCount}</h1>
            </div>

            {/* Recent students */}
            <div className="glass-card" style={{ marginBottom: "24px" }}>
              <h2 style={{ marginBottom: "18px" }}>
                Recent Students
              </h2>

              {recentStudents.length === 0 ? (
                <p>No students registered yet.</p>
              ) : (
                recentStudents.map((student) => (
                  <div
                    key={student._id || student.studentId}
                    style={{
                      padding: "14px 0",
                      borderBottom: "1px solid #e2e8f0"
                    }}
                  >
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <p>
                      {student.branch} - Semester {student.semester}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Quick actions */}
        <div className="glass-card">
          <h2
            style={{
              fontFamily: "'Outfit'",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#18231c",
              marginBottom: "18px"
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px"
            }}
          >
            <Link
              to="/"
              className="btn-primary"
              style={{
                background: "linear-gradient(135deg,#1a4a2e,#14391f)",
                justifyContent: "center",
                padding: "16px",
                boxShadow: "0 6px 20px rgba(26,74,46,0.35)"
              }}
            >
              Go to Homepage
            </Link>

            <Link
              to="/login"
              className="btn-primary"
              style={{
                background: "linear-gradient(135deg,#4a1a3e,#3a1230)",
                justifyContent: "center",
                padding: "16px",
                boxShadow: "0 6px 20px rgba(74,26,62,0.35)"
              }}
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;