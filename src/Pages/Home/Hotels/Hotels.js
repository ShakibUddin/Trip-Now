import React from 'react';
import Loader from 'react-loader-spinner';
import useData from '../../../Hooks/useData';
import HotelCard from './HotelCard/HotelCard';

const Hotels = () => {
    const { hotels } = useData();
    if (hotels.length === 0) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="Bars"
            color="#3386FF"
            height={100}
            width={100}
            timeout={4000}
        />

    </div>);
    return (
        <div className="w-full flex flex-col items-center membership-margin-top">
            <p className="font-bold lg:text-4xl md:text-3xl text-2xl uppercase p-3 mt-16 mb-2 text-center text-black">Some of our partners</p>
            <div className="w-full mx-auto flex flex-wrap justify-center">
                {
                    hotels.map(item => <HotelCard key={item._id} data={item}></HotelCard>)
                }
            </div>
        </div>
    );
};

export default Hotels;