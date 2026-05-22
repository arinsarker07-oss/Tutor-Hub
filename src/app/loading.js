import React from 'react';
import {  FadeLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className='flex justify-center items-center h-screen w-full p-40'>
            <FadeLoader
                color="#0026ff"
                cssOverride={{}}
                loading
                size={100}
                speedMultiplier={1}
            />
        </div>
    );
};

export default loading;