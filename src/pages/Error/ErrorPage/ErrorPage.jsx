import React, { useContext } from 'react';
import { Link } from 'react-router';
import error404 from "../../../assets/animation/error404.json"
import error from "../../../assets/animation/error.json";
import Lottie from 'lottie-react';
// import { AuthContext } from '../../context/AuthContext/AuthContext';
// import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    // const {theme} = useContext(AuthContext);
    // data-theme={theme ? 'light' : 'dark'}
    return (
        <div className="@container p-3" >
            {/* <Helmet>
            <title>Page Not Found | TechTinker</title>
            </Helmet> */}

            <div className="flex justify-center items-center min-h-screen">
                <div className="px-2 mt-6">
                    <div className="flex mx-auto justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                        <Lottie animationData={error404} loop={true} />
                    </div>
                    <div className="text-center space-y-5">
                        <div className='text-red-600 font-bold flex flex-col items-center @min-[410px]:flex-row gap-1.5 text-4xl'>
                            <Lottie animationData={error} className='w-[70px] h-[70px]' loop={true} />
                            <h1>404- Page Not Found</h1>                         
                        </div>
                        <p className='dark-1 text-xl font font-semibold'>Oops! The page you're looking for doesn't exist</p>
                        <Link to={'/'} className='btn btn-primary  text-white @min-[400px]:text-lg' >Back to Homepage</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;