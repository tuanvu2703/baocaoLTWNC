import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate(); // Hook để điều hướng

    const handleBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <button onClick={handleBack} className="btn btn-secondary">
            Back
        </button>
    );
}
