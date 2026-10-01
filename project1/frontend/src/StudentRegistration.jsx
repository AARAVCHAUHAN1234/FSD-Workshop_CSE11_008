import { useState } from 'react';
import './index.css';
import axios from 'axios';

function StudentRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    try {
      const response = await axios.post(
        'http://localhost:5000/register',
        {
          name,
          email,
          username,
          password
        }
      );

      alert(response.data.message);
      setName('');
      setEmail('');
      setUsername('');
      setPassword('');
      navigate('/loginPage');
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        'Registration failed'
      );
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Student Registration</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegistration;

