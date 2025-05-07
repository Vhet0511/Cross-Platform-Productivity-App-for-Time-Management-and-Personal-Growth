// src/pages/SignupPage.tsx

import { useState } from 'react';

interface SignupPageProps {
  setUser: (user: any) => void;
  switchToLogin: () => void;
}

export default function SignupPage({ setUser, switchToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Signup failed');
      }

      setUser(data);
      sessionStorage.setItem('user', JSON.stringify(data));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-20 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <input
        type="text"
        name="name"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dob"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={handleChange}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleSignup}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Create Account
      </button>

      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <button
          onClick={switchToLogin}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
}
