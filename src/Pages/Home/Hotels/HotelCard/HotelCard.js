import React from 'react';
import StarRatings from 'react-star-ratings';

const HotelCard = (props) => {
    const { name, rating, location, price, image } = props.data;
    return (
        <div className="lg:w-1/4 md:w-2/5 sm:w-full rounded overflow-hidden shadow-md m-2 flex justify-between flex-col relative bg-blend-multiply bg-gray-500" style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", minWidth: "300px", minHeight: "350px" }}>
            <div className='w-full'>
                <p className="text-white absolute top-0 left-0 font-bold text-sm p-2">
                    {location}
                </p>
                <div className="absolute w-full bottom-0 left-0 flex flex-col items-start p-2">
                    <StarRatings
                        className="text-left my-2"
                        rating={parseFloat(rating)}
                        starDimension="30px"
                        starRatedColor="orange"
                        starSpacing="5px"
                    />
                    <p className="text-white text-xl font-bold my-2">{name}</p>
                    <p className="text-white bg-red-600 rounded-sm p-2 text-xl my-2">
                        From {price} Taka
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;