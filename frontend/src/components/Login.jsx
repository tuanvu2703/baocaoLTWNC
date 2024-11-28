import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user/login', { identifier, password });

            if (response.data) {
                const { accessToken, role, username, avatar } = response.data;

                // Kiểm tra role trước khi lưu token
                if (role === 0) { // Admin
                    // Lưu token vào cookies cho trang admin
                    // Cookies.set('token', accessToken, { expires: 7, path: '/', domain: 'localhost' });
                    // Chuyển hướng đến trang admin
                    window.location.href = 'http://localhost:3001/';
                    localStorage.setItem('token', accessToken);
                } else if (role === 1) { // User
                   
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('user', JSON.stringify({ username, avatar }));

                    // Ở lại trang hiện tại (chỉ cần gọi navigate('/') để chuyển hướng nếu cần)
                    navigate('/');
                } else {
                    setError('Invalid role. Please contact support.');
                }
            } else {
                setError(response.data.message || 'Login failed.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    
    

    return (
        <div className="grid place-items-center min-h-screen">
            <div className='bg-white rounded-2xl px-5 py-5 w-full max-w-sm'>
                <h2 className='font-bold my-5 text-center text-2xl'>Login</h2>
                <form onSubmit={handleLogin} className="grid gap-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input 
                        type="text" 
                        className="grow" 
                        placeholder="Username" 
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                         />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 ">
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
                        <input
                        type="password" 
                        className="grow" 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {error && <p className="">{error}</p>}
                    <button className='bg-sky-500 rounded-xl p-3 mt-5' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export { Login };
