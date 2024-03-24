import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners'; // Import the spinner component
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when the request is initiated

      const response = await fetch('https://password-be-v2o7.onrender.com/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        toast.success('Password reset link sent to your email');
      } else {
        toast.error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div className="container form-container text-white fw-bold m-5">
      <h1 className='text-center'>Forgot Password</h1>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn w-50 btn-submit btn-primary">
            {loading ? (
              <RingLoader color={'#36D7B7'} loading={loading} size={30} />
            ) : (
              'Reset Password'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;