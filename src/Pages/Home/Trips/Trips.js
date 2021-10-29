import React from 'react';
import useData from "../../../Hooks/useData";
import TripCard from './TripCard/TripCard';
import './Trips.css';

const Trips = () => {
    const { trips } = useData();
    return (
        <div className="w-full flex flex-col items-center membership-margin-top">
            <p className="font-bold text-4xl uppercase p-3 mt-16 mb-2 text-black text-center">Choose Your Dream Trips</p>
            <div className="w-full mx-auto flex flex-wrap justify-center">
                {
                    trips.map(item => <TripCard key={item._id} data={item}></TripCard>)
                }
            </div>
        </div>
    );
};

export default Trips;