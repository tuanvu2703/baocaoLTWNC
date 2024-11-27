import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                usernameOrEmail: formData.usernameOrEmail,
                password: formData.password,
            };

            const loginResponse = await axios.post("http://localhost:3001/user/login", loginData);
            const token = loginResponse.data.token; // Lưu token (nếu API trả về)
            localStorage.setItem("authToken", token); // Lưu token vào localStorage
            setSuccess("Registered and logged in successfully!");
            setError("");
            // Chuyển hướng (tùy chỉnh URL)
            window.location.href = "/dashboard"; 
        } catch (err) {
            setError("Registration succeeded, but login failed. Please log in manually.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            setSuccess(response.data.message); // Hiển thị thông báo thành công
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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username or Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="usernameOrEmail"
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                        placeholder="Enter username or email"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                    />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="born"
                        value={formData.born}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter address"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                    />
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">{success}</p>}
                <button type="submit" className="btn btn-primary btn-block mt-4">Register</button>
            </form>
        </div>
    );
};

export default Register;
