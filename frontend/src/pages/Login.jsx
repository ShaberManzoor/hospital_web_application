import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { authContext } from '../context/AuthContext';
import HashLoader from 'react-spinners/HashLoader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {dispatch} = useContext(authContext);

  const handleChange = async e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/sign-in`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if(!res.ok){
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role
        }
      });

      console.log(result, 'login data');

      setLoading(false);
      toast.success(result.message);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor leading-9 font-bold mb-10">
          Hello! <span className='text-primaryColor'>Welcome</span> Back 🎉
        </h3>
        <form className='py-4 md:py-0' onSubmit={handleSubmit}>
          <div className="mb-5">
            <input 
              type="email" 
              name="email" 
              placeholder='Enter Your Email' 
              value={formData.email} 
              onChange={handleChange} 
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required />
          </div>
          <div className="mb-5">
            <input 
              type="password" 
              name="password" 
              placeholder='Enter Your Password' 
              value={formData.password} 
              onChange={handleChange} 
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required />
          </div>
          <div>
            <button type="submit" className='w-full bg-primaryColor text-white text-[18px] rounded-lg p-2'>
              {loading ? <HashLoader size={25} color='#fff'/> : 'Login'}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don't have an account? <Link to={'/sign-up'} className='text-primaryColor font-medium ml-1'>Register</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login