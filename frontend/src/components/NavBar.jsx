import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../axiosService/user/userAxios';

export default function NavBar({ themes, currentTheme, changeTheme }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery(""); 
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

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                src={`http://localhost:3001/${user.avatar}`}
                                alt="Avatar"
                                className="img-fluid rounded-circle mb-4"
                                style={{ maxWidth: '200px', borderRadius: '50%' }}
                                />
                            </div>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/user/profile" className="justify-between">
                                    {user.username}
                                </Link>
                            </li>
                            <li><a href='/order'>OrderDetail</a></li>
                            <li><Link to="/user/changepassword">Change Password</Link></li>
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
                                <button
                                    type="button"
                                    onClick={() => handleLogout(navigate)} 
                                    className="btn btn-danger"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="m-1 z-10">
                        <Link to={"/login"} className='bg-[#007bff] px-3 py-3 rounded-lg'>Login</Link>
                        <Link to={"/register"} className='bg-[#38bdf8] px-3 py-3 rounded-lg'>register</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
