
import { faDollarSign, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = (props) => {
    const { _id, name, description, image, price, day, night, breakfast, lunch, dinner } = props.data;
    const showBuyNowButton = props.showBuyNow;
    return (
        <div className="w-full bg-white rounded-md shadow-xl my-20 flex flex-col justify-between">
            <div>
                <div className="w-full lg:h-72 md:h-64 h-56 px-4">
                    <img className="w-full h-full rounded-2xl shadow-2xl -mt-20" src={image} alt="" />
                </div>
                <div className="w-full p-4">
                    <div className="flex justify-between">
                        <p className="lg:text-3xl md:text-3xl text-2xl font-extrabold text-gray-700">{name}</p>
                        <p className="text-yellow-500 font-bold lg:text-4xl md:text-3xl text-2xl text-center">
                            <FontAwesomeIcon icon={faDollarSign} /> {Math.round(price / 80)}  <span className="text-gray-500 text-xl">/<FontAwesomeIcon icon={faUserAlt} /></span>
                        </p>
                    </div>
                    <div className="w-full flex justify-start my-2">
                        <p className="inline-block bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{day} Days</p>
                        <p className="inline-block bg-purple-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{night} Nights</p>
                    </div>
                    <div className="w-full flex justify-start my-2">
                        {breakfast && <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Breakfast</p>}
                        {lunch && <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lunch</p>}
                        {dinner && <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Dinner</p>}
                    </div>
                    <p className="text-gray-600">
                        {description}
                    </p>
                </div>
            </div>

            {showBuyNowButton && <Link className="w-2/5 mb-4 mx-auto" to={`/trip/${_id}`}>
                <button className="mt-3 px-4 py-2 w-full shadow-md rounded-md bg-blue-400 text-white">
                    Book Now
                </button>
            </Link>}
        </div>

    );
};

export default TripCard;