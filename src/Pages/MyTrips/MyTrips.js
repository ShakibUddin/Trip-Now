import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import Modal from 'react-modal';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';

//modal style
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%) scale(0.45,0.55)',
    },
};

// binding modal to  appElement 
Modal.setAppElement("#root");

const MyTrips = () => {
    const { allBookings, handleDeleteBooking, fetchBookings } = useData();
    const { user } = useAuth();
    const [modalIsOpen, setIsOpen] = useState(false);
    //clicked booking object
    const [booking, setBooking] = useState({});
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
        setBooking(booking);
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        //after user closes modal rediret to home
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
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Trip Now"
            >

                <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-3xl py-10 text-green-600 font-extrabold text-center">Are you sure you want to delete {booking.tripId}({booking.destination}) of {booking.name}?</p>
                    <div className="w-full flex justify-center">
                        <button className="w-1/3 mx-auto px-4 p-2 bg-red-600 rounded-md text-white cursor-pointer" onClick={() => {
                            closeModal();
                            handleDeleteBooking(booking._id);
                        }}>Yes</button>
                        <button className="w-1/3 mx-auto px-4 p-2 bg-green-600 rounded-md text-white cursor-pointer" onClick={closeModal}>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyTrips;