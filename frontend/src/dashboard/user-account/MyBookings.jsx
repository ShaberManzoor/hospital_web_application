import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import HashLoader from 'react-spinners/HashLoader';
import DoctorCard from '../../components/DoctorCard';

const MyBookings = () => {
    const {
        data: appointments,
        loading,
        error
    } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);
  return (
    <div>
    {loading && !error && <HashLoader color='#0067ff' className='mx-auto my-24' />}
    {error && !loading && <Error errorMessage={error}/>}
    {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {appointments.map(doctor => (
                <DoctorCard doctor={doctor} key={doctor._id}/>
            ))}
        </div>
    )}
    {!loading && !error && appointments.length==0 && (
        <h2 className='mt-5 text-center text-primaryColor font-semibold text-[20px]'>You didn't book any appointments yet!</h2>
    )}
    </div>
  )
}

export default MyBookings