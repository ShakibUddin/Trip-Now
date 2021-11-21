import React from 'react';
import Gallery from 'react-photo-gallery';
import aboutbg from '../../images/aboutbg.jpg';
import Footer from '../Shared/Footer/Footer';
import NavBar from '../Shared/Navigation/NavBar/NavBar';

const About = () => {

    const photos = [
        {
            src: 'https://i.ibb.co/n1CD0K3/b-1.jpg',
            width: 4,
            height: 3
        },
        {
            src: 'https://i.ibb.co/xLVhYfX/b-2.jpg',
            width: 4,
            height: 3
        },
        {
            src: 'https://i.ibb.co/BcP3PK9/b-3.jpg',
            width: 4,
            height: 3
        },
        {
            src: 'https://i.ibb.co/M733ByK/b-4.jpg',
            width: 5,
            height: 3
        },
        {
            src: 'https://i.ibb.co/DfYjxtV/b-5.jpg',
            width: 3,
            height: 4
        },
        {
            src: 'https://i.ibb.co/sVyc4gJ/b-6.jpg',
            width: 3,
            height: 4
        },
        {
            src: 'https://i.ibb.co/PcqQ9Xq/b-7.jpg',
            width: 4,
            height: 3
        },
    ];
    return (
        <React.Fragment>
            <NavBar transparent={true}></NavBar>
            <div className="w-full mx-auto flex flex-col items-center ">
                <div className="w-full h-96">
                    <img className="w-full h-full object-cover" src={aboutbg} alt="" />
                </div>
                <p className="font-bold text-4xl uppercase p-3 mt-16 mb-2 text-center text-black">About us</p>
                <div className="w-full flex flex-col items-center my-4" style={{ minWidth: "250px" }}>
                    <p className="w-11/12 p-2 text-xl text-justify">Trip Now enables users to quickly and easily explore a destination’s offerings and create personalized sightseeing itineraries by utilizing local expertise and cutting-edge artificial intelligence. Drawing from a database of over 80,000 destinations Trip Now makes trip planning easy, intuitive and enjoyable for over 25 million travelers a year.</p>
                </div>
                <div className="w-10/12">
                    <Gallery photos={photos} />
                </div>
                <div className="w-full flex flex-col items-center my-4" style={{ minWidth: "250px" }}>
                    <p className="w-11/12 p-2 text-xl text-justify ">Trip Now For Partners enables trip planning within any innovative travel website. Trip Now for Partners is now available for NTOs, corporate partners, travel agencies, airlines and destination marketing organizations of all shapes and sizes.</p>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>
    );
};

export default About;