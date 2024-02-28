import React from 'react'
import { formatDate } from '../utils/formatDate'

const DocAbout = ({name, about, qualifications, experiences}) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
            {name}
          </span>
        </h3>
        <p className="text_para">
          {about}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, ind)=>
            <li key={ind} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                {formatDate(item.startDate)} - {formatDate(item.endDate)}
              </span>
              <p className="text-[16px] laeding-6 font-medium text-textColor">
                {item.degree}
              </p>
            </div>
            <p className="text-[14px] laeding-5 font-medium text-textColor">
                {item.university}
            </p>
          </li>
          )}
          
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-bold">Experience</h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, ind)=>
            <li key={ind} className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </span>
            <p className="text-[16px] laeding-6 font-medium text-textColor">
              {item.position}
            </p>
            <p className="text-[14px] laeding-5 font-medium text-textColor">
              {item.hospital}
            </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default DocAbout