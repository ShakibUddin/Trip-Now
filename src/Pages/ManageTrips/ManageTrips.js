import React from 'react';
import useData from '../../Hooks/useData';

const Managebookings = () => {
    const { allBookings, handleDeleteBooking } = useData();
    return (
        <div className="w-full mx-auto flex flex-col flex-wrap justify-center p-2">
            <div className="-my-2 overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3 text-center text-xs font-medium text-gray-500 uppercase "
                                    >
                                        Trip-Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Contact
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Approved
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allBookings.map((booking) => (
                                    <tr key={booking.tripId}>
                                        <td className="py-4 whitespace-nowrap text-center">
                                            <div className="text-sm text-gray-900">{booking.tripId}</div>
                                        </td>
                                        <td className="py-4 whitespace-nowrap text-center">
                                            <div className="text-sm text-gray-900">{booking.email}</div>
                                        </td>
                                        <td className="py-4 whitespace-nowrap text-center">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {booking.contact}
                                            </span>
                                        </td>
                                        <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{booking.address}</td>
                                        <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{booking.approved ? <p>Yes</p> : <p>No</p>}</td>
                                        <td className="py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <div className="flex justify-around">
                                                <button className="w-2/4 mx-2 p-2 text-white text-xs bg-green-500">Approve</button>
                                                <button className="w-2/4 mx-2 p-2 text-white text-xs bg-red-500" onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Managebookings;