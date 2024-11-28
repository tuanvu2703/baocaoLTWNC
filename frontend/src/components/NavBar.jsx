import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ themes, currentTheme, changeTheme }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);  // Lưu trữ thông tin người dùng
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
        setUser(storedUser);  // Cập nhật trạng thái người dùng
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery(""); // Reset giá trị tìm kiếm
        }
    };

    return (
        <div className="navbar bg-base-100 border-b-[1px] border-purple-600 fixed z-50">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">NemoSHOP</Link>
            </div>

            <div className="flex-none">
                <div className="form-control">
                    <form onSubmit={handleSearch} className="form-control">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>

                    <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <a href='/user/currentCart' className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </a>
                        </div>
                    </div>
                </div>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {/* Sửa đường dẫn avatar ở đây */}
                                <img alt="Avatar" src={`http://localhost:3001${user.avatar}`} />
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/user/profile" className="justify-between">
                                    {user.username}
                                </Link>
                            </li>
                            <li><a href='/order'>OrderDetail</a></li>
                            <li><Link>Settings</Link></li>
                            <li>
                                <select className="" value={currentTheme} onChange={(e) => changeTheme(e.target.value)}>
                                    {themes.map((theme) => (
                                        <option key={theme} value={theme}>
                                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                <Link>Logout</Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="m-1 z-10">
                        <Link to={"/login"} className='bg-[#007bff] px-3 py-3 rounded-lg'>Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
