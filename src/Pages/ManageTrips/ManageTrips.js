import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useData from '../../Hooks/useData';

const Managebookings = () => {
    const { allBookings, handleDeleteBooking } = useData();
    return (
        <div className="w-full p-2">
            <Table>
                <Thead>
                    <Tr className="bg-blue-600">
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">TripId</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Email</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Contact</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Address</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Approved</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        allBookings.map(booking =>
                            <Tr key={booking._id} className="bg-white">
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.tripId}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.email}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.contact}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.address}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.approved ? "Yes" : "No"}</Td>
                                <Td>
                                    <div className="flex justify-center">
                                        <button className="w-2/4 mx-1 p-2 bg-green-500 text-white">Approve</button>
                                        <button className="w-2/4 mx-1 p-2 bg-red-500 text-white" onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                                    </div>
                                </Td>
                            </Tr>)
                    }
                </Tbody>
            </Table>
        </div>
    );
};

export default Managebookings;