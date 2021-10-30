import React from 'react';
import Hero from './Hero/Hero';
import Hotels from './Hotels/Hotels';
import Services from './Services/Services';
import Stats from './Stats/Stats';
import Trips from './Trips/Trips';

const Home = () => {
    const tripsRef = React.createRef();

    return (
        <div className="w-full flex flex-col items-center">
            <Hero scrollTo={tripsRef}></Hero>
            <Services></Services>
            <Trips reference={tripsRef}></Trips>
            <Hotels></Hotels>
            <Stats></Stats>
        </div >
    );
};

export default Home;