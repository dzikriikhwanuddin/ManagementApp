import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErrorMessage("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    try {
      await axios.post("http://localhost:5124/api/auth/register", {
        username: user.username,
        password: user.password,
      });

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrasi</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>username</label>
          <input
            type="username"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Konfirmasi Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Registrasi
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
