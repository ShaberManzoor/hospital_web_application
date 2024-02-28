import React, { useEffect, useState } from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import uploadImageToCloudinary from './../../utils/uploadCloudinary'
import { toast } from 'react-toastify';
import { BASE_URL, token } from '../../config';

const ProfileSetting = ({doctorData}) => {
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        bio: '',
        gender: '',
        specialisation: '',
        fees: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null
    });

    useEffect(()=>{
        setFormdata({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialisation: doctorData?.specialisation,
            fees:doctorData?.fees,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots:doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    },[doctorData])
    const handleInputChange = async e =>{
        setFormdata({...formData, [e.target.name]:e.target.value});
    }

    const handleFileChange = async e => {
        const file = e.target.files[0];
        const data = await uploadImageToCloudinary(file);

        setFormdata({...formData, photo: data?.url})
    }

    const updateProfileHandler = async e => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if(!res.ok){
                throw Error(result.message);
            }

            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const addItem = (key, item) => {
        setFormdata(prevFormData => ({...prevFormData, [key]: [...prevFormData[key], item]}))
    }

    const handleReusableInputChangeFunc = (key, index, event) => {
        const {name, value} = event.target;

        setFormdata(prevFormData => {
            const updateItems = [...prevFormData[key]];

            updateItems[index][name] = value;

            return{
                ...prevFormData,
                [key]: updateItems
            }
        })
    }

    const deleteItem = (key, index) => {
        setFormdata(prevFormData => ({...prevFormData, [key]:prevFormData[key].filter((_,i)=>i!==index)}))
    }
    
    //handling qualifications
    const addQualifications = e => {
        e.preventDefault();

        addItem('qualifications', {
            startDate: '', endDate: '', degree: '', university: ''
        })
    }

    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc('qualifications', index, event)
    }

    const deleteQualifications = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index);
    }

    //handle experiences
    const addExperiences = e => {
        e.preventDefault();

        addItem('experiences',{
            startDate: '', endDate: '', position: '', hospital: ''
        })
    }

    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc('experiences', index, event)
    }

    const deleteExperiences = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index);
    }

    //handling timeSlots
    const addTimeslot = e => {
        e.preventDefault();

        addItem('timeSlots',{
            day: '', startTime: '', endTime: ''
        });
    }

    const handleTimeChange = (event, index) => {
        handleReusableInputChangeFunc('timeSlots', index, event)
    }

    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index);
    }

  return (
    <div>
        <h2 className="text-headingColor font-bold text-[24px] mb-10">
            Profile Information
        </h2>

        <form action="">
            <div className="mb-5">
                <p className="form_label">Name*</p>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}  placeholder='Full Name' className='form_input'/>
            </div>
            <div className="mb-5">
                <p className="form_label">Email*</p>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}  placeholder='Email' className='form_input' readOnly aria-readonly disabled={true} />
            </div>
            <div className="mb-5">
                <p className="form_label">Phone*</p>
                <input type="number" name="phone" value={formData.phone} onChange={handleInputChange}  placeholder='Phone Number' className='form_input' />
            </div>
            <div className="mb-5">
                <p className="form_label">Bio*</p>
                <input type="text" name="bio" value={formData.bio} onChange={handleInputChange}  placeholder='Bio' className='form_input' maxLength={100} />
            </div>
            <div className="mb-5">
                <div className="grid grid-cols-3 gap-5 mb-[30px]">
                    <div>
                        <p className="form_label">Gender*</p>
                        <select name='gender' value={formData.gender} onChange={handleInputChange} className='form_input py-3.5'>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p className="form_label">Specialisation*</p>
                        <select name='specialisation' value={formData.specialisation} onChange={handleInputChange} className='form_input py-3.5'>
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="darmatologist">Dermatologist</option>
                        </select>
                    </div>
                    <div>
                        <p className="form_label">Fees*</p>
                        <input type="number" placeholder='1000' name='fees' value={formData.fees} className='form_input' onChange={handleInputChange}/>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <p className="form_label">Qualifications*</p>
                {formData.qualifications?.map((item, ind)=>(
                    <div key={ind}>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <p className="form_label">Starting Date*</p>
                                <input type="date" name="startDate" value={item.startDate} className='form_input' onChange={e => handleQualificationChange(e, ind)} />
                            </div>
                            <div>
                                <p className="form_label">Ending Date*</p>
                                <input type="date" name="endDate" value={item.endDate} className='form_input' onChange={e => handleQualificationChange(e, ind)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <div>
                                <p className="form_label">Degree*</p>
                                <input type="text" name="degree" value={item.degree} className='form_input' onChange={e => handleQualificationChange(e, ind)} />
                            </div>
                            <div>
                                <p className="form_label">University*</p>
                                <input type="text" name="university" value={item.university} className='form_input' onChange={e => handleQualificationChange(e, ind)} />
                            </div>
                        </div>

                        <button onClick={e=>deleteQualifications(e, ind)} className="bg-red-600 p-2 rounded-full text-white text-[16px] mt-2 mb-[30px] cursor-pointer">
                            <AiOutlineDelete />
                        </button>
                    </div>
                ))}

                <button onClick={addQualifications} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                    Add Qualfications
                </button>
            </div>

            <div className="mb-5">
                <p className="form_label">Experiences*</p>
                {formData.experiences?.map((item, ind)=>(
                    <div key={ind}>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <p className="form_label">Starting Date*</p>
                                <input type="date" name="startDate" value={item.startDate} className='form_input' onChange={e => handleExperienceChange(e, ind)} />
                            </div>
                            <div>
                                <p className="form_label">Ending Date*</p>
                                <input type="date" name="endDate" value={item.endDate} className='form_input' onChange={e=> handleExperienceChange(e, ind)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <div>
                                <p className="form_label">Postion*</p>
                                <input type="text" name="position" value={item.position} className='form_input' onChange={e=> handleExperienceChange(e, ind)} />
                            </div>
                            <div>
                                <p className="form_label">Hospital*</p>
                                <input type="text" name="hospital" value={item.hospital} className='form_input' onChange={e=> handleExperienceChange(e, ind)} />
                            </div>
                        </div>

                        <button onClick={e=>deleteExperiences(e, ind)} className="bg-red-600 p-2 rounded-full text-white text-[16px] mt-2 mb-[30px] cursor-pointer">
                            <AiOutlineDelete />
                        </button>
                    </div>
                ))}

                <button onClick={addExperiences} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
                    Add Experience
                </button>
            </div>
            <div className="mb-5">
                <p className="form_label">Time Slots*</p>
                {formData.timeSlots?.map((item, ind)=>(
                    <div key={ind}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            <div>
                                <p className="form_label">Day*</p>
                                <select name="day" value={item.day} className='form_input py-3.5' onChange={e => handleTimeChange(e, ind)}>
                                    <option value="">Select</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                </select>
                            </div>
                            <div>
                                <p className="form_label">Starting Time*</p>
                                <input type="time" name="startTime" value={item.startTime} className='form_input' onChange={e => handleTimeChange(e, ind)} />
                            </div>
                            <div>
                                <p className="form_label">Ending Time*</p>
                                <input type="time" name="endTime" value={item.endTime} className='form_input' onChange={e => handleTimeChange(e, ind)} />
                            </div>
                            <div className='item-center'>
                                <button onClick={e=>deleteTimeSlot(e, ind)} className="bg-red-600 p-2 rounded-full text-white text-[16px] mt-12 cursor-pointer">
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button onClick={addTimeslot} className='bg-[#000] py-2 px-5 mt-2 rounded text-white h-fit cursor-pointer'>
                    Add Time Slot
                </button>
            </div>

            <div className="mb-5">
                <p className="form_label">About*</p>
                <textarea name='about' value={formData.about} className='form_input' rows={6} placeholder='Write about yourself' onChange={handleInputChange} />
            </div>

            <div className="mb-5 flex items-center gap-3">
                {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                    <img src={formData.photo} alt="" className='w-full rounded-full' />
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
            <div className="mt-7">
                <button type='submit' onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] w-full py-3 px-4 rounded-lg">
                    Update Profile
                </button>
            </div>
        </form>
    </div>
  )
}

export default ProfileSetting