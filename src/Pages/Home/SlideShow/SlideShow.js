import React from 'react';
import Loader from 'react-loader-spinner';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import useApi from '../../../Hooks/useApi';
import PopularPlaceCard from '../PopularPlaceCard/PopularPlaceCard';

const SlideShow = () => {
    const { popularPlaces } = useApi();
    if (popularPlaces.length === 0) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="Bars"
            color="#3386FF"
            height={100}
            width={100}
        />

    </div>);
    return (
        <div className="w-full my-24 flex items-center flex-col">
            <p className="font-bold text-4xl uppercase p-3 mt-12 mb-2 text-black text-center">Popular Destinations</p>
            <Carousel autoPlay={true} interval={2000} showArrows={true} infiniteLoop={true} swipeable={true} showThumbs={false} className="w-full">
                {popularPlaces.map((place) => (
                    <PopularPlaceCard key={place._id} data={place}></PopularPlaceCard>
                ))}
            </Carousel>
        </div>
    );
};

export default SlideShow;