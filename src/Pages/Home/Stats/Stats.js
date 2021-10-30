import { faGlobeAsia, faPlaneDeparture, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
const Stats = () => {

    return (
        <div className="w-full my-16">
            <div className="w-4/5 mx-auto shadow-md bg-white flex flex-wrap justify-around p-5">
                <div className="w-1/6 m-4 flex flex-col justify-start items-center bg-white lg:m-2 my-2 p-3" style={{ minWidth: "150px" }}>
                    <FontAwesomeIcon className="mr-2 text-center text-4xl text-blue-500" icon={faUsers} />
                    <p className="font-bold lg:text-4xl md:text-3xl sm:text-2xl text-black py-3 text-center uppercase">5k</p>
                    <p className="font-bold lg:text-xl md:text-xl sm:text-sm text-gray-500  text-center">Customers</p>
                </div>
                <div className="w-1/6 m-4 flex flex-col justify-start items-center bg-white lg:m-2 my-2 p-3" style={{ minWidth: "150px" }}>
                    <FontAwesomeIcon className="mr-2 text-center text-4xl text-blue-500" icon={faPlaneDeparture} />
                    <p className="font-bold lg:text-4xl md:text-3xl sm:text-2xl text-black py-3 text-center uppercase">10k</p>
                    <p className="font-bold lg:text-xl md:text-xl sm:text-sm text-gray-500  text-center">Trips</p>
                </div>
                <div className="w-1/6 m-4 flex flex-col justify-start items-center bg-white lg:m-2 my-2 p-3" style={{ minWidth: "150px" }}>
                    <FontAwesomeIcon className="mr-2 text-center text-4xl text-blue-500" icon={faGlobeAsia} />
                    <p className="font-bold lg:text-4xl md:text-3xl sm:text-2xl text-black py-3 text-center uppercase">2M</p>
                    <p className="font-bold lg:text-xl md:text-xl sm:text-sm text-gray-500  text-center">Followers</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;