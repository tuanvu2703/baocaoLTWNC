import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Order from '../views/order/order';

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Lấy token từ localStorage (hoặc cookie)
        const token = localStorage.getItem('token');

        // Gửi yêu cầu đến API để lấy thông tin người dùng với token trong header
        if (token) {
            axios.get('http://localhost:3001/user/currentUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    setCurrentUser(response.data);
                })
                .catch((error) => {
                    console.error('Failed to fetch user data:', error);
                });
        }
    }, []);

    if (!currentUser) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    // Lấy thông tin người dùng từ response
    console.log(currentUser);
    const { username, fullname, email, phone, address, gender, born, avatar } = currentUser;
    const formattedBornDate = new Date(born).toLocaleDateString();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {/* Avatar */}

                <div className='flex flex-row h-full'>
                    <div>


                        <div className="col-12 col-md-4 text-center">
                            <img
                                src={`http://localhost:3001${avatar}`}
                                alt="Avatar"
                                className="img-fluid rounded-circle mb-4"
                                style={{ maxWidth: '200px' }}
                            />
                        </div>
                        {/* User Information */}
                        <div className="col-12 col-md-6">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title text-center mb-4">User Profile</h4>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <strong>Username: </strong> {username}
                                        </li>
                                        <li className="mb-3">
                                            <strong>Full Name: </strong> {fullname}
                                        </li>
                                        <li className="mb-3">
                                            <strong>Email: </strong> {email}
                                        </li>
                                        <li className="mb-3">
                                            <strong>Phone: </strong> {phone}
                                        </li>
                                        <li className="mb-3">
                                            <strong>Address: </strong> {address}
                                        </li>
                                        <li className="mb-3">
                                            <strong>Gender: </strong> {gender}
                                        </li>
                                        <li className="mb-3">
                                            <strong>Born: </strong> {formattedBornDate}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full'>
                    <Order/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
