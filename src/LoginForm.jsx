import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie'


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    setLoading(true);
    setError('');

    // Create the login request body
    const requestData = {
      email: email,
      password: password,
    };

    try {
      // Send the POST request to the backend API
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFtoken': Cookies.get('csrftoken')
        },
        body: JSON.stringify(requestData),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        const access = Cookies.set('accessToken', data.token.access)
        const refresh = localStorage.setItem('refreshToken', data.token.refresh)
        console.log('Login successful', data);
        navigate('/')
        // Handle successful login (e.g., save token, redirect)
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');

      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
