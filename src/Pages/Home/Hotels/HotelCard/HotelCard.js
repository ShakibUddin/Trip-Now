import React from 'react';
import StarRatings from 'react-star-ratings';

const HotelCard = (props) => {
    const { _id, name, rating, location, price, image } = props.data;
    return (
        <div className="lg:w-1/4 md:w-2/4 sm:w-3/4 p-4 bg-white rounded-md shadow-sm flex flex-col justify-between m-3">
            <div className='w-full'>
                <div className="w-full h-60 rounded-lg overflow-hidden overflow-hidden">
                    <img src={image} className="w-full h-full" alt="" />
                </div>
                <div className="py-4">
                    <p className="text-gray-700 text-3xl font-bold">{name}</p>
                    <p className="text-gray-400">
                        {location}
                    </p>
                    <StarRatings
                        rating={parseFloat(rating)}
                        starDimension="25px"
                        starRatedColor="orange"
                        starSpacing="5px"
                    />
                </div>
                <p className="text-yellow-500 font-bold text-xl">
                    From {price} Taka
                </p>
            </div>
        </div>
    );
};

export default HotelCard;