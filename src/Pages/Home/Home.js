import React from 'react';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navigation/NavBar/NavBar';
import Hero from './Hero/Hero';
import Hotels from './Hotels/Hotels';
import Services from './Services/Services';
import SlideShow from './SlideShow/SlideShow';
import Stats from './Stats/Stats';
import Trips from './Trips/Trips';


const Home = () => {

    const tripsRef = React.createRef();
    return (
        <React.Fragment>
            <NavBar></NavBar>
            <div className="w-full flex flex-col items-center">
                <Hero scrollTo={tripsRef}></Hero>
                <Services></Services>
                <Trips reference={tripsRef}></Trips>
                <Hotels></Hotels>
                <SlideShow></SlideShow>
                <Stats></Stats>
            </div >
            <Footer />
        </React.Fragment>

    );
};

export default Home;