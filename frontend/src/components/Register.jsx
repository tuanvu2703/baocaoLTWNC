import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    born: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginAfterRegister = async () => {
    try {
      const loginData = {
        identifier: formData.usernameOrEmail,
        password: formData.password,
      };

      const loginResponse = await axios.post("http://localhost:3001/user/login", loginData);
      const token = loginResponse.data.accessToken; 
      localStorage.setItem('token', token);

      setSuccess("Registered and logged in successfully!");
      setError("");
      window.location.href = "/";
    } catch (err) {
      setError("Registration succeeded, but login failed. Please log in manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        setError("Password and Confirm Password do not match.");
        setSuccess(""); // Xóa thông báo thành công nếu có
        return; // Dừng hàm lại nếu không khớp
      }
      
    try {
      const dataToSend = {
        password: formData.password,
        fullname: formData.fullname,
        gender: formData.gender,
        born: formData.born,
        phone: formData.phone,
        address: formData.address,
      };

      if (isEmail(formData.usernameOrEmail)) {
        dataToSend.email = formData.usernameOrEmail;
      } else {
        dataToSend.username = formData.usernameOrEmail;
      }

      const response = await axios.post("http://localhost:3001/user/register", dataToSend);
      setSuccess(response.data.message);
      setError("");

      // Gọi hàm login sau khi đăng ký thành công
      await loginAfterRegister();
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Hiển thị lỗi từ server
      } else {
        setError("An error occurred. Please try again.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className=" bg-white rounded-lg px-5 py-5 w-full max-w-xl border-2 border-purple-800">
        <h2 className="font-bold text-2xl text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            placeholder="Username or Email"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="FullName"
            className="input input-bordered w-full"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option disabled value="">
              Choose Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="born"
            value={formData.born}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="input input-bordered w-full"
          />

           <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            className="input input-bordered w-full"
          />
          
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="input input-bordered w-full"
          />
         

          {error && <p className="text-danger mt-2">{error}</p>}
          {success && <p className="text-success mt-2">{success}</p>}
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Register
          </button>
        </form>
        <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
      </div>

    </div>
  );
};

export default Register;
