import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const data = [];

app.post("/register", (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (data.some((u) => u.username === username)) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    data.push({ name, username, email, password });

    res.status(201).json({
      message: "Registration successful"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = data.find(
      (u) =>
        u.username === username &&
        u.password === password
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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});