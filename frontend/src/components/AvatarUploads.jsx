
import React, { useState } from 'react';
import { uploadAvatar } from '../axiosService/user/userAxios';

const AvatarUpload = ({ onClose, onAvatarUpdate }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // Lưu file vào state
    }
  };

  const handleUploadAvatar = () => {
    if (!avatarFile) {
      alert('Please select an avatar file before uploading.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    setIsUploading(true); // Hiển thị trạng thái đang tải lên
    uploadAvatar(token, formData)
      .then((response) => {
        alert('Avatar updated successfully!');
        onAvatarUpdate(response.data.avatar); // Cập nhật avatar trong parent component
        onClose(); // Đóng form upload sau khi tải lên thành công
      })
      .catch((error) => {
        console.error('Failed to upload avatar:', error);
        alert('Failed to upload avatar. Please try again.');
      })
      .finally(() => {
        setIsUploading(false); // Đặt lại trạng thái sau khi tải lên xong
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Change Avatar</h4>
        <input type="file" onChange={handleAvatarChange} />
        {avatarFile && (
          <button onClick={handleUploadAvatar} className="btn btn-primary">
            {isUploading ? 'Uploading...' : 'Upload Avatar'}
          </button>
        )}
        <button onClick={onClose} className="btn btn-secondary mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AvatarUpload;
