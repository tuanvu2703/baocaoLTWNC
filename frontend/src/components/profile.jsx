import React, { useEffect, useState } from 'react';
import Order from '../views/order/order';
import { getCurrentUser, updateUser } from '../axiosService/user/userAxios';
import AvatarUpload from './AvatarUploads';


const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [isAvatarUploadVisible, setIsAvatarUploadVisible] = useState(false); // Quản lý trạng thái hiển thị form upload avatar
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        getCurrentUser(token)
          .then((response) => {
            setCurrentUser(response.data);
            setFormData(response.data);
          })
          .catch((error) => console.error('Failed to fetch user data:', error));
      }
    }, []);
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleEditProfile = () => {
      const token = localStorage.getItem('token');
      updateUser(token, formData)
        .then((response) => {
          alert('Profile updated successfully!');
          setCurrentUser(response.data.data);
          setEditMode(false);
        })
        .catch((error) => console.error('Failed to update profile:', error));
    };
  
    const handleAvatarUpdate = () => {
      const token = localStorage.getItem('token');
      getCurrentUser(token)
        .then((response) => {
          setCurrentUser(response.data); 
        })
        .catch((error) => console.error('Failed to fetch user data after avatar update:', error));
      localStorage.removeItem("user");
      localStorage.setItem('user', JSON.stringify({ username, avatar }));
      // Reload trang sau khi đổi avatar
      window.location.reload();
    };
  
    if (!currentUser) {
      return <div className="text-center mt-5">Loading...</div>;
    }
  
    const { username, fullname, email, phone, address, gender, born, avatar } = currentUser;
    const formattedBornDate = new Date(born).toLocaleDateString('en-GB');
  
    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="flex flex-row h-full">
              <div>
                <div
                  className="col-12 col-md-4 text-center relative"
                  onMouseEnter={() => setEditMode(true)}
                  onMouseLeave={() => setEditMode(false)}
                >
                  <img
                    src={`http://localhost:3001/${avatar}`}
                    alt="Avatar"
                    className="img-fluid rounded-circle mb-4"
                    style={{ maxWidth: '200px', borderRadius: '50%' }} // Đảm bảo ảnh là hình tròn
                  />
                  <button
                    onClick={() => setIsAvatarUploadVisible(true)} // Hiển thị form upload avatar khi nhấn
                    className="btn btn-primary mt-2"
                  >
                    Change Avatar
                  </button>
                </div>
    
                <div className="col-12 col-md-6">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h4 className="card-title text-center mb-4">User Profile</h4>
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            name="username"
                            value={formData.username || ''}
                            onChange={handleInputChange}
                            placeholder="Username"
                            className="form-control mb-3"
                            disabled // Không cho phép thay đổi username
                          />
                          <input
                            type="text"
                            name="fullname"
                            value={formData.fullname || ''}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="form-control mb-3"
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="form-control mb-3"
                          />
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="form-control mb-3"
                          />
                          <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="form-control mb-3"
                          />
                          <select
                            name="gender"
                            value={formData.gender || ''}
                            onChange={handleInputChange}
                            className="form-control mb-3"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <input
                            type="date"
                            name="born"
                            value={formData.born || ''}
                            onChange={handleInputChange}
                            className="form-control mb-3"
                          />
                          <button onClick={handleEditProfile} className="btn btn-success">
                            Save
                          </button>
                        </>
                      ) : (
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
                      )}
                      {!editMode && (
                        <button
                          onClick={() => setEditMode(true)}
                          className="btn btn-primary mt-2"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <Order />
              </div>
            </div>
          </div>
    
          {/* Hiển thị form upload avatar nếu isAvatarUploadVisible là true */}
          {isAvatarUploadVisible && (
            <div className="modal-overlay">
              <div className="modal-content">
                <AvatarUpload
                  onClose={() => setIsAvatarUploadVisible(false)}
                  onAvatarUpdate={handleAvatarUpdate} // Cập nhật lại avatar khi upload thành công
                />
              </div>
            </div>
          )}
        </div>
      );
    };
    

export default UserProfile;
