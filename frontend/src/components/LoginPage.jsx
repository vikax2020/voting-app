import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name");
      return;
    }
    // Save name in sessionStorage
    sessionStorage.setItem("voterName", name);
    // Redirect to Voting Page
    navigate("/vote");
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
