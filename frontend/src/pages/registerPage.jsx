import { useState } from "react";
import { registerUser } from "../services/authService";
import "tailwindcss";
function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" , role: ""});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submit:", form);
    try {
      const data = await registerUser(form);
      alert("Registration successful!");
      console.log(data);
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Something went wrong");
    }
  };

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3 mx-auto mt-10 p-4 border rounded">
        <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded"
        />
        <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
        />
        <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="p-2 border rounded"
        />

        {/* ✅ Role Dropdown */}
        <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="p-2 border rounded"
        >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
            Register
        </button>
    </form>

  );
}

export default RegisterPage;
