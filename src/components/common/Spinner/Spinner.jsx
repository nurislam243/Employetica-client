import React from 'react';

const Spinner = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <span class="loader"></span>
        </div>
    );
};

export default Spinner;