import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/");

      // Redirect by role
      if (res.data.user.role === "admin") navigate("/admin/dashboard");
      else if (res.data.user.role === "superadmin") navigate("/superadmin/dashboard");
      else navigate("/products");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{color:"red"}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/auth/register">Register</a></p>
    </div>
  );
}
