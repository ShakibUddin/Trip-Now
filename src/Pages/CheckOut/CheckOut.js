import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import complete from '../../images/complete.png';
import failed from '../../images/failed.png';

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

const CheckOut = () => {
    const {
        error, user
    } = useAuth();
    const { trips, handleBooking, tripBooked } = useData();
    const history = useHistory();
    const { tripId } = useParams();
    const redirect_uri = '/home';
    const [trip, setTrip] = useState("");


    useEffect(() => {
        setTrip(trips.find(trip => trip._id === tripId));
    }, [trips, tripId, setTrip]);

    //check if tripBooked is updated
    //then open modal


    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        //after user closes modal rediret to home
        history.push(redirect_uri);
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(4, 'Name must be at least 6 characters')
            .max(30, 'Name must be maximum 30 characters'),
        contact: Yup.string()
            .required('Contact is required')
            .min(6, 'Contact must be at least 6 characters')
            .max(15, 'Contact must be maximum 15 characters'),
        address: Yup.string()
            .required('Address is required')
            .min(4, 'Address must be at least 4 characters')
            .max(30, 'Address must be maximum 30 characters'),

    }).required();

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        handleBooking(tripId, trip.name, data.name, user.email, data.contact, data.address);
        openModal();
    };

    return (
        <div className="w-full flex flex-col items-center">
            <p className="text-4xl py-10 font-extrabold">Book Trip</p>
            <div className="w-full flex flex-wrap justify-evenly">
                <div style={{ minWidth: "250px" }} className="lg:w-2/4 md:w-2/4 sm:w-full p-2 m-2 flex flex-col items-center">
                    <div className="lg:w-3/4 md:w-full sm:w-full h-56 rounded-lg overflow-hidden">
                        <img src={trip.image} className="w-full h-full" alt="" />
                    </div>
                    <div className="py-4">
                        <p className="text-gray-700 text-3xl font-bold text-center">{trip.name}</p>
                        <p className="text-yellow-500 font-bold text-3xl text-center">
                            {trip.price} Taka <span className="text-black text-xl">/person</span>
                        </p>
                        <p className="text-gray-400 my-2 text-justify">
                            {trip.description}
                        </p>
                        <div className="w-3/4 mx-auto bg-green-500 p-2 m-2 text-white text-center">
                            <p>{trip.day} Days, {trip.night} Nights</p>
                        </div>
                        <div className="w-full flex justify-center">
                            {trip.breakfast && <p className="bg-yellow-300 p-2 rounded-lg m-2 text-sm text-black">Breakfast</p>}
                            {trip.lunch && <p className="bg-red-300 p-2 rounded-lg m-2 text-sm text-black">Lunch</p>}
                            {trip.dinner && <p className="bg-green-300 p-2 rounded-lg m-2 text-sm text-black">Dinner</p>}
                        </div>
                    </div>
                </div>
                <form style={{ minWidth: "250px" }} className="lg:w-1/3 md:w-2/4 sm:w-full p-2 m-2 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                    <input className="w-full p-3 my-2 border-2 rounded-md bg-white" type="text" placeholder="Enter name" {...register("name")} disabled={user.name ? true : false} />
                    {errors.name && <p className="w-full text-start text-red-600 font-bold">{errors.name?.message}</p>}

                    <input disabled={true} className="w-full p-3 my-2 border-2 rounded-md bg-white" type="email" placeholder="Enter email" value={user.email} {...register("email")} />

                    <input className="w-full p-3 my-2 border-2 rounded-md bg-white" type="number" placeholder="Enter contact number" {...register("contact")} />
                    {errors.contact && <p className="w-full text-start text-red-600 font-bold">{errors.contact?.message}</p>}

                    <input className="w-full p-3 my-2 border-2 rounded-md bg-white" type="text" placeholder="Enter address" {...register("address")} />
                    {errors.address && <p className="w-full text-start text-red-600 font-bold">{errors.address?.message}</p>}


                    <input className="w-full mx-auto px-4 p-2 bg-blue-600 rounded-md text-white cursor-pointer" type="submit" name="SUBMIT" />
                    {error && <p className="w-full text-start text-red-600 font-bold">{error}</p>}
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Trip Now"
                    >

                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="mx-auto w-3/12">
                                <img className="w-full" src={tripBooked ? complete : failed} alt="" />
                            </div>
                            {tripBooked === 1 && <p className="text-3xl py-10 text-green-600 font-extrabold text-center">Trip booked successfully</p>}
                            {tripBooked === 0 && <p className="text-3xl py-10 text-red-600 font-extrabold text-center">Trip booked failed</p>}
                            <button className="w-full mx-auto px-4 p-2 bg-red-600 rounded-md text-white cursor-pointer" onClick={closeModal}>close</button>
                        </div>
                    </Modal>
                </form>

            </div>
        </div>
    );
};

export default CheckOut;