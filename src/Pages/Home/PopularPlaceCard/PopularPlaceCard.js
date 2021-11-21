import React from 'react';

const PopularPlaceCard = (props) => {
    const { name, image } = props.data;
    return (
        <div className='lg:w-2/4 md:w-3/4 sm:w-10/12 mx-auto my-8'>
            <p className="lg:text-3xl md:text-3xl text-2xl text-dark font-bold my-4">{name}</p>
            <img className="w-full sm:h-48 md:h-80 lg:h-96" src={image} alt="" />
        </div>
    );
};

export default PopularPlaceCard;