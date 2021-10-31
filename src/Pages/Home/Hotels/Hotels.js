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
        <div className="w-full flex flex-col justify-center items-center text-center">
            <p className="font-bold text-4xl uppercase p-3 mt-16 mb-2 text-black">Some of our partners</p>
            <div className="flex flex-wrap justify-evenly">
                {
                    hotels.map(item => <HotelCard key={item._id} data={item}></HotelCard>)
                }
            </div>
        </div>
    );
};

export default Hotels;