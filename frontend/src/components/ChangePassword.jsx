import React, { useState } from 'react';
import { changePassword } from '../axiosService/user/userAxios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu các trường không được điền đầy đủ
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }


        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const response = await changePassword(oldPassword, newPassword); // Gọi hàm từ userService
            setSuccess('Password updated successfully');
            setError('');
            setTimeout(() => {
                navigate('/'); // Redirect to home page after successful password update
            }, 1500);
        } catch (err) {
            setError(err || 'Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold">Change Password</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                
                <div className="mb-4">
                    <label className="block">Old Password</label>
                    <input 
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter old password"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block">New Password</label>
                    <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter new password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Confirm New Password</label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Confirm new password"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-full">Change Password</button>
            </form>
        </div>
    );
}

export { ChangePassword };
