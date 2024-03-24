import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners'; 

const VerifyToken = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    fetch(`https://password-be-v2o7.onrender.com/api/verify-token/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        setLoading(false);

        if (response.ok) {
          toast.success('Token verified. Redirecting to reset password page.');
          navigate(`/reset-password/${token}`);
        } else {
          toast.error('Token verification failed. Please try again.');
          navigate('/login');
        }
      })
      .catch((error) => {
        setLoading(false); 
        console.error('Error:', error);
        toast.error('Something went wrong');
        navigate('/login');
      });
  }, [token, navigate]);

  return (
    <div className='container m-5 form-container text-white fw-bold'>
      <h1 className='text-center'>Verifying Token...</h1>
      {loading && (
        <div className='text-center'>
          <RingLoader color={'#36D7B7'} loading={loading} size={30} />
        </div>
      )}
    </div>
  );
};

export default VerifyToken;