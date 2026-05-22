import React from 'react';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div>
            <HashLoader
                color="#0ee1dd"
                cssOverride={{}}
                loading
                size={100}
                speedMultiplier={1}
            />
        </div>
    );
};

export default loading;