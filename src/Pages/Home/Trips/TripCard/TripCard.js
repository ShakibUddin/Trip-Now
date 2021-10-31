
import React from 'react';
import { Link } from 'react-router-dom';
const TripCard = (props) => {
    const { _id, name, description, image, price, day, night, breakfast, lunch, dinner } = props.data;
    return (
        <div className="lg:w-1/4 md:w-2/5 sm:w-full rounded overflow-hidden shadow-lg m-2 flex justify-between flex-col pb-2">
            <div className='w-full'>
                <div className="w-full h-60">
                    <img src={image} className="w-full h-full" alt="" />
                </div>
                <div className="p-4">
                    <p className="text-gray-700 text-3xl font-bold">{name}</p>
                    <p className="text-gray-400">
                        {description}
                    </p>
                </div>
            </div>

            <div className='w-full flex-col flex items-center'>
                <p className="text-yellow-500 font-bold text-3xl text-center">
                    {price} Taka <span className="text-black text-xl">/person</span>
                </p>
                <div className="bg-green-500 p-2 m-2 text-white">
                    <p>{day} Days, {night} Nights</p>
                </div>
                <div className="w-full flex justify-center">
                    {breakfast && <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Breakfast</p>}
                    {lunch && <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lunch</p>}
                    {dinner && <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Dinner</p>}
                </div>

                <Link className="w-2/3" to={`/trip/${_id}`}>
                    <button className="w-full mt-3 bg-blue-500 text-white text-center py-2 px-4">
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TripCard;