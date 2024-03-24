import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners'; // Import the spinner component
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('https://password-be-v2o7.onrender.com/api/protected-route', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          toast.error('Failed to fetch user data');
          navigate('/login');
        })
        .finally(() => {
          setLoading(false); // Set loading to false when the request is complete
        });
    }
  }, [navigate]);

  return (
    <div className="container form-container text-center m-5">
      <h1 className="mb-4 text-white">Dashboard</h1>
      <div className="card">
        <div className="card-body fw-bold">
          {loading ? (
            <div className="spinner-container">
              <RingLoader color={'#36D7B7'} loading={loading} size={150} />
            </div>
          ) : userData ? (
            <div>
              <h4 className="mb-3">Welcome {userName}😍</h4>
              <p className="card-text">User ID: {userData.user.userId}</p>
              <p className="card-text">User Email: {userData.user.email}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;