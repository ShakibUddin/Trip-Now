import React from 'react';
import Hero from './Hero/Hero';
import Hotels from './Hotels/Hotels';
import Trips from './Trips/Trips';

const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Hero></Hero>
            <Trips></Trips>
            <Hotels></Hotels>
            {/* <p className="font-bold text-4xl uppercase p-3 mt-16 mb-2 text-black">Recent Stories</p> */}
            {/* <Blogs></Blogs> */}
        </div >
    );
};

export default Home;