import React, { useState } from 'react'
import doctorImg from '../assets/images/doctor-img02.png'
import starIcon from '../assets/images/Star.png'
import DocAbout from './DocAbout';
import DocFeedback from './DocFeedback';
import SidePanel from './SidePanel';
import useFetchData from '../hooks/useFetchData';
import { BASE_URL } from '../config';
import HashLoader from 'react-spinners/HashLoader';
import Error from '../components/Error';
import { useParams } from 'react-router-dom';

const DoctorDetails = () => {
  const [tab, setTab] = useState('about');
  const {id} = useParams();
  
  const {data: doctor, loading, error} = useFetchData(`${BASE_URL}/doctors/${id}`);
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <HashLoader color='#0067ff' className='mx-auto my-24' />}
        {error && <Error />}
        {!loading && !error && <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className='max-w-[200px] max-h-[200px]'>
                <img src={doctor.photo || doctorImg} alt="" />
              </figure>
              <div>
                <span className='bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>Surgeon</span>
                <h3 className='text-headingColor leading-9 mt-3 font-bold'>
                  {doctor.name}
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" />
                    {doctor.averageRating}
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 text-textColor'>({doctor.totalRating})</span>
                </div>

                <p className='text_para'>
                  {doctor.bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid dark:border-gray-600">
              <button 
                onClick={() => setTab('about')}
                className={`${tab==='about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 leading-7 text-headingColor font-semibold`}>
                About
              </button>
              <button
                onClick={() => setTab('feedback')}
                className={`${tab==='feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 leading-7 text-headingColor font-semibold`}>
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === 'about' && <DocAbout name={doctor.name} about={doctor.about} experiences={doctor.experiences} qualifications={doctor.qualifications} />}
              {tab === 'feedback' && <DocFeedback reviews={doctor.reviews} totalRating={doctor.totalRating} />}
            </div>
          </div>
          <div>
            <SidePanel doctorId={doctor._id} fees={doctor.fees} timeSlots={doctor.timeSlots} />
          </div>
        </div>}
      </div>
    </section>
  )
}

export default DoctorDetails