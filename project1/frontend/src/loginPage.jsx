import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        {
          username,
          password
        }
      );

      alert(response.data.message);

      navigate('/studentDashboard');

    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Unable to connect to server'
      );
    }
  }

  return (
    <section>
      <h1>Student Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;

