import React from 'react'
import { formatDate } from '../../utils/formatDate'

const Appointments = ({appointments}) => {
  return (
    <table className="w-full text-left text-gray-700 text-sm">
        <thead className="text-xs text-gray-600 uppercase bg-gray-100">
            <th scope='col' className='px-6 py-3'>Name</th>
            <th scope='col' className='px-6 py-3'>Gender</th>
            <th scope='col' className='px-6 py-3'>Payment</th>
            <th scope='col' className='px-6 py-3'>Price</th>
            <th scope='col' className='px-6 py-3'>Booked on</th>
        </thead>
        <tbody>
            {appointments?.map(item => (
                <tr key={item._id}>
                    <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
                        <img src={item.user.photo} alt="" className='w-10 h-10 rounded-full' />
                        <div className="pl-3">
                        <div className="text-base">{item.user.name}</div>
                        <div className="text-normal text-gray-500">
                            {item.user.email}
                        </div>
                        </div>
                    </th>
                    <td className="px-6 py-4">{item.user.gender}</td>
                    <td className="px-6 py-4">
                        {item.isPaid && (
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">
                                    Paid
                                </div>
                            </div>
                        )}
                        {item.isPaid && (
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2">
                                    Unpaid
                                </div>
                            </div>
                        )}
                    </td>
                    <td className="px-6 py-4">{item.fees}</td>
                    <td className="px-6 py-4">{formatDate(item.createdAt)} </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Appointments