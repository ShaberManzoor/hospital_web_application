import React, { useEffect, useState } from 'react'
import { doctors } from '../assets/data/doctors'
import DoctorCard from '../components/DoctorCard'
import Testimonials from '../components/Testimonials'
import useFetchData from '../hooks/useFetchData'
import { BASE_URL } from '../config'
import HashLoader from 'react-spinners/HashLoader'
import Error from '../components/Error'

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  
  const handleSearch = () => {  
    setQuery(query.trim());
    console.log('handle search');
  };

  useEffect(()=> {
    const timeout = setTimeout(()=> {
      setDebounceQuery(query);
    },700)

    return ()=> clearTimeout(timeout);
  }, [query]);

  const {data: doctors, loading, error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <>
    <section className="bg-[#fff9ea]">
      <div className="container text-center">
        <h2 className="heading">Find a Doctor</h2>
        <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
          <input type="text" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' placeholder='Search Doctor by name or specialisation' value={query} onChange={e=>setQuery(e.target.value)} />
          <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch} >
            Search
          </button>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
        {loading && <HashLoader color='#0067ff' className='mx-auto my-24' />}
        {error && <Error />}
        {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {doctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor}  />)}
        </div>}
      </div>
    </section>
    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className='text-center heading'>What out patient say</h2>
          <p className="text_para text-center">World-class care for everyone. Our health system offers unmatched expert health care.</p>
        </div>

        <Testimonials />
      </div>
    </section>
    </>
  )
}

export default Doctors