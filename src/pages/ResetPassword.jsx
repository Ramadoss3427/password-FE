import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners'; // Import the spinner component

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { token } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); 

      // Password validation
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.newPassword)) {
        toast.error('Password must be at least 8 characters with 1 uppercase letter, 1 number, and 1 special character');
        setLoading(false);
        return;
      }

      const response = await fetch('https://password-be-v2o7.onrender.com/api/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, token }), 
      });

      if (response.ok) {
        toast.success('Password reset successful');
        navigate('/login');
      } else {
        toast.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container form-container text-white fw-bold m-5">
      <h1 className='text-center'>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            onChange={handleChange}
            required
          />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn w-50 btn-submit btn-primary">
            {loading ? (
              <RingLoader color={'#36D7B7'} loading={loading} size={30} />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;