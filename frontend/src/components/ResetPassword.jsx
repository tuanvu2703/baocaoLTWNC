import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '../axiosService/user/userAxios';

 function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {}; // Lấy email từ state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Gọi API reset mật khẩu
      const data = await resetPasswordApi(email, password);
      setSuccess(data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Điều hướng đến trang đăng nhập sau khi reset mật khẩu thành công
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-white rounded-lg px-5 py-5 w-full max-w-xl border-2 border-purple-800">
        <h2 className="font-bold text-2xl text-center mb-8">Reset Password</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export { ResetPassword };