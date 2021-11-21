import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import TripCard from '../Home/Trips/TripCard/TripCard';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navigation/NavBar/NavBar';


const CheckOut = () => {
    const {
        error, user
    } = useAuth();
    const { trips, handleBooking } = useData();
    const history = useHistory();
    const { tripId } = useParams();
    const redirect_uri = '/home';
    const [trip, setTrip] = useState({});


    useEffect(() => {
        setTrip(trips.find(trip => trip._id === tripId));
    }, [trips, tripId]);

    const validationSchema = Yup.object().shape({
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
        handleBooking(tripId, trip.name, user.name, user.email, data.contact, data.address);
        history.push(redirect_uri);
    };

    return (
        <React.Fragment>
            <NavBar></NavBar>
            <div className="w-full flex flex-col items-center">
                <p className="text-4xl py-10 font-extrabold">Book Trip</p>
                <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                    <div style={{ minWidth: "250px" }} className="lg:px-16 md:px-4 py-2 m-2 flex flex-col items-center">
                        <TripCard data={trip} showBuyNow={false}></TripCard>
                    </div>
                    <form style={{ minWidth: "250px" }} className="px-8 py-2 m-2 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                        <input className="w-full p-3 my-2 border-2 rounded-md bg-white" type="text" placeholder="Enter name" {...register("name")} value={user.name} disabled={true} />
                        {errors.name && <p className="w-full text-start text-red-600 font-bold">{errors.name?.message}</p>}

                        <input disabled={true} className="w-full p-3 my-2 border-2 rounded-md bg-white" type="email" placeholder="Enter email" value={user.email} {...register("email")} />

                        <input className="w-full p-3 my-2 border-2 rounded-md bg-white" type="number" placeholder="Enter contact number" {...register("contact")} />
                        {errors.contact && <p className="w-full text-start text-red-600 font-bold">{errors.contact?.message}</p>}

                        <input className="w-full p-3 my-2 border-2 rounded-md bg-white" type="text" placeholder="Enter address" {...register("address")} />
                        {errors.address && <p className="w-full text-start text-red-600 font-bold">{errors.address?.message}</p>}


                        <input className="w-full mx-auto px-4 p-2 bg-blue-600 rounded-md text-white cursor-pointer" type="submit" name="SUBMIT" />
                        {error && <p className="w-full text-start text-red-600 font-bold">{error}</p>}
                    </form>

                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>

    );
};

export default CheckOut;