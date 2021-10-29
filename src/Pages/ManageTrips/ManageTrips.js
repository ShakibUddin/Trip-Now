import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import useData from '../../Hooks/useData';
//modal style
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%) scale(0.65,0.75)',
    },
};

// binding modal to  appElement 
Modal.setAppElement("#root");

const Managebookings = () => {
    const { allBookings, handleDeleteBooking, fetchBookings } = useData();
    const [modalIsOpen, setIsOpen] = useState(false);
    //clicked booking object
    const [booking, setBooking] = useState({});

    useEffect(() => {
        fetchBookings();
    }, []);

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
    return (
        <div className="w-full p-2 h-screen">
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
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.tripId}({booking.destination})</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.email}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.contact}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.address}</Td>
                                <Td className="text-gray-400 text-xs text-center py-3">{booking.approved ? "Yes" : "No"}</Td>
                                <Td>
                                    <div className="flex justify-center">
                                        <button className="w-2/4 mx-1 p-2 bg-green-500 text-white">Approve</button>
                                        <button className="w-2/4 mx-1 p-2 bg-red-500 text-white" onClick={() => {
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
                contentLabel="Welcome"
            >

                <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-3xl py-10 text-green-600 font-extrabold text-center">Are you sure you want to delete {booking.tripId}({booking.destination}) of {booking.email}?</p>
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

export default Managebookings;