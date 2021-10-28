import React from 'react';
const About = () => {

    return (
        <div className="w-full mx-auto flex flex-col items-center ">
            <div className="w-full flex flex-wrap justify-evenly">
                <div className="lg:w-2/4 w-full flex flex-col items-center" style={{ minWidth: "250px" }}>
                    <p className="w-full p-4 mb-20 ">TripNow enables users to quickly and easily explore a destination’s offerings and create personalized sightseeing itineraries by utilizing local expertise and cutting-edge artificial intelligence. Drawing from a database of over 80,000 destinations TripNow makes trip planning easy, intuitive and enjoyable for over 25 million travelers a year.</p>
                </div>
                <div className="lg:w-2/4 w-full flex flex-col items-center" style={{ minWidth: "250px" }}>
                    <p className="w-full p-4 mb-20 ">TripNow For Partners enables trip planning within any innovative travel website. TripNow for Partners is now available for NTOs, corporate partners, travel agencies, airlines and destination marketing organizations of all shapes and sizes.</p>
                </div>
            </div>
        </div>
    );
};

export default About;