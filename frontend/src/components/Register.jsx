import React, { useState } from "react";
import axios from "axios";


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
        <div className="grid place-items-center min-h-screen">
            <div className=" bg-white rounded-lg px-5 py-5 w-full max-w-xl border-2 border-purple-800">
                <h2 className="font-bold text-2xl text-center mb-8">Register</h2>
                <form onSubmit={handleSubmit} className="grid gap-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>

                        <input type="text" className="grow" placeholder="Username" />
                    </label>
                    {/* FULLNAME */}
                    <input type="text" placeholder="FullName" className="input input-bordered w-full" />
                    {/* GENDER */}
                    <select className="select select-bordered w-full ">
                        <option disabled selected>Choose Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    {/* BIRTHDAY */}
                    <input type="date" className="input input-bordered w-full " />
                    {/* ADDRESS */}
                    <input type="text" placeholder="Address" className="input input-bordered w-full " />
                    {/* PASSWORD */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow" placeholder="Password" />
                    </label>
                    {/* PHONE */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                        <input type="text" className="grow" placeholder="Your Phone" />
                    </label>

                    {error && <p className="text-danger mt-2">{error}</p>}
                    {success && <p className="text-success mt-2">{success}</p>}
                    <button type="submit" className="btn btn-primary btn-block mt-4">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
