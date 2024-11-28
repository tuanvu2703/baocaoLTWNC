import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtpApi } from '../axiosService/user/userAxios';

 function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {}; // Lấy email từ state (truyền từ ForgotPassword)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gọi API xác thực OTP
      const data = await verifyOtpApi(email, otp);
      setSuccess(data.message);
      setError('');
      setTimeout(() => {
        navigate('/resetPassword', { state: { email } }); // Chuyển sang trang reset password
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-white rounded-lg px-5 py-5 w-full max-w-xl border-2 border-purple-800">
        <h2 className="font-bold text-2xl text-center mb-8">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export { VerifyOtp };