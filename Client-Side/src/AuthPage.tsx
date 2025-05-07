// src/pages/AuthPage.tsx
import { useState } from 'react';

interface AuthPageProps {
  setUser: (user: any) => void;
}

export default function AuthPage({ setUser }: AuthPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); // clear previous errors
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Login failed');
      }

      console.log(data);
      // Save user info to state + session
      setUser(data);
      sessionStorage.setItem('user', JSON.stringify(data)); // Save user in sessionStorage
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-20 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        type="email"
        className="w-full border p-2 mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border p-2 mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}