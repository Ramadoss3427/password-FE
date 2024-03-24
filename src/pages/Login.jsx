import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners'; // Import the spinner component
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when the request is initiated

      const response = await fetch('https://password-be-v2o7.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, userName, avatar } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        localStorage.setItem('avatar', avatar);

        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="container form-container text-white fw-bold m-5">
      <h1 className='text-center'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-submit w-50 fw-bold btn-primary">
            {loading ? (
              <RingLoader color={'#36D7B7'} loading={loading} size={30} />
            ) : (
              'Submit'
            )}
          </button>
          <p className="mt-3">
            <h5>
              <span className="text-warning fw-bold" style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                Forgot Password?
              </span>
            </h5>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;