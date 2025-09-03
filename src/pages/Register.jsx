import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/auth/register", form);
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div style={{color:"red"}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/auth/login">Login</a></p>
    </div>
  );
}