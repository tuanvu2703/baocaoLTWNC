import React, { useState } from 'react';
import { requestOtpResetPassword } from '../axiosService/user/userAxios';
import { useNavigate } from 'react-router-dom';

 function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await requestOtpResetPassword(email); // Gọi API gửi OTP
      setSuccess(data.message);
      setError('');
      // Điều hướng sang trang xác nhận OTP, và truyền email đi
      navigate('/verifyOtp', { state: { email } });
    } catch (err) {
      setError(err);
      setSuccess('');
    }
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="bg-white rounded-lg px-5 py-5 w-full max-w-xl border-2 border-purple-800">
        <h2 className="font-bold text-2xl text-center mb-8">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
          <button type="submit" className="btn btn-primary btn-block mt-4">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export { ForgotPassword }