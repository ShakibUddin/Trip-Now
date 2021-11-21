import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import mainbg from "../../../images/mainbg.jpg";

const Hero = (props) => {

    const handleClick = () => {
        props.scrollTo?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return (
        <div className="w-full h-screen object-cover bg-fixed bg-blend-multiply bg-gray-400" style={{ backgroundImage: `url(${mainbg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="w-full h-5/6 flex flex-col justify-center items-start p-4 lg:pl-24 md:pl-16">
                <p className='text-white'><FontAwesomeIcon className="text-2xl text-yellow-400" icon={faMapMarkerAlt} /> Bangladesh</p>
                <p className="lg:w-2/4 w-full lg:text-5xl md:text-4xl text-3xl font-extrabold text-white uppercase text-left">Discover the beauty of Bangladesh</p>
                <p className="lg:w-2/4 w-full text-2xl font-extrabold text-white">Find Your Trip Today</p>
                <button onClick={handleClick} className="px-4 py-2 rounded-md shadow-xl mt-8 mr-auto bg-blue-600 text-white uppercase font-bold lg:text-2xl text-xl text-center">Book Trip
                </button>
            </div>
        </div >
    );
};

export default Hero;