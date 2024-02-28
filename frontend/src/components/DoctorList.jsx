import React from 'react'
import DoctorCard from './DoctorCard'
import useFetchData from '../hooks/useFetchData'
import { BASE_URL } from '../config'
import HashLoader from 'react-spinners/HashLoader'
import Error from './Error'

const DoctorList = () => {
  const {data: doctors, loading, error} = useFetchData(`${BASE_URL}/doctors`);
  return (
    <>
    {loading && <HashLoader color='#0067ff' className='mx-auto my-24' />}
    {error && <Error />}
    {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[30px]'>
      {doctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor}  />)}
    </div>}
    </>
  )
}

export default DoctorList