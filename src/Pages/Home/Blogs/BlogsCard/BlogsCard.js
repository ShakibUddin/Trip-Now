import React from 'react';

const StoriesCard = (props) => {
    const { title, category, image } = props.data;
    return (
        <div style={{ minWidth: "300px" }} className="m-6 flex justify-start shadow-2xl flex-col  overflow-hidden w-1/4 bg-white">
            <img className="w-full h-3/5 object-cover" src={image} alt="" />
            <p className="font-extrabold text-xl p-3 text-black">{title}</p>
            <p className="p-2 font-bold text-black">{category}</p>
        </div>
    );
};

export default StoriesCard;