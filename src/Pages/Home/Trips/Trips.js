import React from 'react';
import Loader from 'react-loader-spinner';
import useData from "../../../Hooks/useData";
import TripCard from './TripCard/TripCard';

const Trips = (props) => {
    const { trips } = useData();
    if (trips.length === 0) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="Bars"
            color="#3386FF"
            height={100}
            width={100}
            timeout={4000}
        />

    </div>);
    return (
        <div ref={props.reference} className="w-full flex flex-col items-center membership-margin-top p-4">
            <p className="font-bold lg:text-4xl md:text-3xl text-2xl uppercase p-3 mt-16 mb-2 text-black text-center ">Choose Your Dream Trips</p>
            <div className="w-full mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {
                    trips.map(item => <TripCard key={item._id} data={item} showBuyNow={true}></TripCard>)
                }
            </div>
        </div>
    );
};

export default Trips;