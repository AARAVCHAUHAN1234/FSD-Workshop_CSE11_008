import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// In-memory data
const users = [];
const students = [];

// ==================== USER REGISTRATION ====================

app.post("/register", (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    if (users.some((user) => user.username === username)) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    users.push({
      name,
      username,
      email,
      password
    });

    res.status(201).json({
      message: "Registration successful"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});

// ==================== USER LOGIN ====================

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// ==================== GET ALL STUDENTS ====================

app.get("/students", (req, res) => {
  res.json(students);
});

// ==================== GET STUDENT BY ID ====================

app.get("/students/:studentId", (req, res) => {
  const student = students.find(
    (student) => student.studentId === req.params.studentId
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found."
    });
  }

  res.json(student);
});

// ==================== ADD STUDENT ====================

app.post("/students", (req, res) => {
  try {
    const {
      studentId,
      name,
      email,
      branch,
      semester,
      mobileNumber
    } = req.body;

    // Required fields
    if (
      !studentId ||
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      !branch ||
      semester === undefined ||
      semester === "" ||
      !mobileNumber
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const cleanId = String(studentId).trim();

    // Unique student ID
    if (students.some((student) => student.studentId === cleanId)) {
      return res.status(409).json({
        message: "Student with this ID already exists."
      });
    }

    // Semester validation
    const sem = Number(semester);

    if (!Number.isInteger(sem) || sem < 1 || sem > 8) {
      return res.status(400).json({
        message: "Semester must be between 1 and 8."
      });
    }

    // Mobile validation
    const mobile = String(mobileNumber).trim();

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        message: "Mobile number must be exactly 10 digits."
      });
    }

    const newStudent = {
      studentId: cleanId,
      name: name.trim(),
      email: email.trim(),
      branch,
      semester: sem,
      mobileNumber: mobile
    };

    students.push(newStudent);

    res.status(201).json({
      message: "Student registered successfully!",
      student: newStudent
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to register student."
    });
  }
});

// ==================== UPDATE STUDENT ====================

app.put("/students/:studentId", (req, res) => {
  const id = req.params.studentId;

  const index = students.findIndex(
    (student) => student.studentId === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found."
    });
  }

  const {
    name,
    email,
    branch,
    semester,
    mobileNumber
  } = req.body;

  // Required fields
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    !branch ||
    semester === undefined ||
    semester === "" ||
    mobileNumber === undefined ||
    mobileNumber === null ||
    String(mobileNumber).trim() === ""
  ) {
    return res.status(400).json({
      message: "All fields are required."
    });
  }

  // Semester validation
  const sem = Number(semester);

  if (!Number.isInteger(sem) || sem < 1 || sem > 8) {
    return res.status(400).json({
      message: "Semester must be between 1 and 8."
    });
  }

  // Mobile validation
  const mobile = String(mobileNumber).trim();

  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({
      message: "Mobile number must be exactly 10 digits."
    });
  }

  students[index] = {
    studentId: id,
    name: name.trim(),
    email: email.trim(),
    branch,
    semester: sem,
    mobileNumber: mobile
  };

  res.json({
    message: "Student updated successfully!",
    student: students[index]
  });
});

// ==================== DELETE STUDENT ====================

app.delete("/students/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  const index = students.findIndex(
    (student) => student.studentId === studentId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found."
    });
  }

  students.splice(index, 1);

  res.json({
    message: "Student deleted successfully."
  });
});

// ==================== START SERVER ====================

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});