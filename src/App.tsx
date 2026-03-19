// src/App.tsx
import React, { useState } from "react";
import "./index.css";

function App() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData({ ...loginData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    alert(`Logged in as: ${loginData.email}`);
  };

  return (
    <div className="login-container">
      <h1>Welcome Back to <span>flavour!</span></h1>
      <p className="subtitle">Login to continue ordering</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email Address / Phone number"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <div className="remember">
          <input
            type="checkbox"
            name="remember"
            checked={loginData.remember}
            onChange={handleChange}
          />
          <label>Remember me</label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <span>Sign Up</span>
      </p>
    </div>
  );
}

export default App;