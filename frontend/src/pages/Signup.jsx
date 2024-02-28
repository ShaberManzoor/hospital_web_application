import { Link, useNavigate } from 'react-router-dom'
import signupImg from '../assets/images/signup.gif'
import { useState } from 'react'
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    gender: '',
    role: 'patient'
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file)

    const data = await uploadImageToCloudinary(file);

    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData({...formData, photo:data.url});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/sign-up`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });

      const {message} = await res.json();

      if(!res.ok){
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate('/sign-in');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">Account</span>
            </h3>
            <form className='py-4 md:py-0' onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder='Full Name' 
                    value={formData.name}
                    onChange={handleChange} 
                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                    required />
                </div>
                <div className="mb-5">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder='Enter your Email'  
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                    required />
                </div>
                <div className="mb-5">
                  <input 
                    type="password" 
                    name="password" 
                    placeholder='Enter Your Password'  
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                    required />
                </div>
                <div className="mb-5 flex items-center justify-between">
                  <label
                  className='text-headingColor font-bold text-[15px] leading-7 px-4 py-3'>
                    Are you a:
                    <select 
                      name="role" 
                      className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none' 
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>
                  <label
                  className='text-headingColor font-bold text-[15px] leading-7 px-4 py-3'>
                    Gender:
                    <select 
                      name="gender" 
                      className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none' 
                      value={formData.gender}
                      onChange={handleChange}>
                      
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="mb-5 flex items-center gap-3">
                  {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                    <img src={previewUrl} alt="" className='w-full rounded-full' />
                  </figure>}

                  <div className='relative w-[130px] h-[50px]'>
                    <input 
                      type="file"
                      name='photo'
                      id='customFile'
                      onChange={handleFileChange}
                      accept='.jpg, .png'
                      className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                     />

                    <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo</label>
                  </div>
                </div>
                <div>
                  <button disabled={loading && true} type="submit" className='w-full bg-primaryColor text-white text-[18px] rounded-lg p-2'>{loading ? <HashLoader size={35} color='white' /> : 'Register'}</button>
                </div>

                <p className="mt-5 text-textColor text-center">
                  Already have an account? <Link to={'/sign-in'} className='text-primaryColor font-medium ml-1'>Login</Link>
                </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Signup