import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';


const MyTrips = () => {
    const { allBookings, handleDeleteBooking, fetchBookings } = useData();
    const { user } = useAuth();
    //clicked booking object
    const [myTrips, setTrips] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    useEffect(() => {
        //filtering users trips/bookings from all bookings
        const myTrips = allBookings.filter(booking => booking.email === user.email);
        setTrips(myTrips);
    }, [allBookings, user.email]);


    function openModal(booking) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure you want to delete ${booking.tripId}(${booking.destination}) of ${booking.name}? You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteBooking(booking._id);
                Swal.fire(
                    'Deleted!',
                    'Booking has been deleted.',
                    'success'
                )
            }
        })
    }

    if (myTrips.length === 0) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="Bars"
            color="#3386FF"
            height={100}
            width={100}
            timeout={4000}
        />

    </div>);
    return (
        <div className="w-full p-2">
            <Table>
                <Thead>
                    <Tr className="bg-blue-600">
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">TripId</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Name</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Email</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Contact</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Address</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3">Status</Th>
                        <Th className="text-center text-white font-bold text-sm uppercase py-3"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        myTrips.map(booking =>
                            <Tr key={booking._id} className="bg-white">
                                <Td className="text-gray-600 text-xs text-center py-3">{booking.tripId}({booking.destination})</Td>
                                <Td className="text-gray-600 text-xs text-center py-3">{booking.name}</Td>
                                <Td className="text-gray-600 text-xs text-center py-3">{booking.email}</Td>
                                <Td className="text-gray-600 text-xs text-center py-3">{booking.contact}</Td>
                                <Td className="text-gray-600 text-xs text-center py-3">{booking.address}</Td>
                                <Td className="text-gray-600 text-xs text-center py-3">{booking.status}</Td>
                                <Td>
                                    <div className="flex justify-center">

                                        <button className="w-full mx-1 p-2 bg-red-500 text-white" onClick={() => {
                                            // passing the clickd booking object
                                            openModal(booking);
                                        }}>
                                            Delete
                                        </button>
                                    </div>
                                </Td>
                            </Tr>)
                    }
                </Tbody>
            </Table>
        </div>
    );
};

export default MyTrips;