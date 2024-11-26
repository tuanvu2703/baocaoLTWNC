

import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
        fullname: "",
        gender: "",
        born: "",
        address: "",
    });
// const {username, password, fullname, gender, born, email, address} = req.body;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Xác định dữ liệu là email hay username
    const isEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                password: formData.password,
                fullname: formData.fullname,
                gender: formData.gender,
                born: formData.born,
                address: formData.address,
            };

            if (isEmail(formData.usernameOrEmail)) {
                dataToSend.email = formData.usernameOrEmail; 
            } else {
                dataToSend.username = formData.usernameOrEmail; 
            }

            // Gửi yêu cầu đến API
            const response = await axios.post("http://localhost:3001/user/register", dataToSend);
            setSuccess(response.data.message); // Hiển thị thông báo thành công
            setError(""); // Reset lỗi nếu có
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message); // Hiển thị lỗi từ server
            } else {
                setError("An error occurred. Please try again."); // Lỗi không xác định
            }
            setSuccess(""); // Reset thông báo thành công
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username or Email:</label>
                    <input
                        type="text"
                        name="userInput"
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                        placeholder="Enter username or email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                    />
                </div>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                        placeholder="Enter full name"
                    />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
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
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Enter address"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
