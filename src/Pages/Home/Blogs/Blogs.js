import React from 'react';
import useData from "../../../Hooks/useData";
import StoryCard from "./BlogsCard/BlogsCard";

const Blogs = () => {
    const { blogs } = useData();
    return (
        <div className="w-full flex flex-col justify-cente">
            <div className="flex flex-wrap justify-evenly">
                {
                    blogs.map(item => <StoryCard key={item.id} data={item}></StoryCard>)
                }
            </div>
        </div>
    );
};

export default Blogs;