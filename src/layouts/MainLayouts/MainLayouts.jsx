import { Outlet } from 'react-router';
import MainFooter from '../../components/common/Footer/Footer';
import Navbar from '../../components/common/Navbar/Navbar';
import { useEffect, useState } from 'react';

const MainLayouts = () => {
    const [isScrolled, setIsScrolled] = useState(false);


    // Scroll effect to shrink navbar height
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className='@container'>
            <Navbar isScrolled={isScrolled}></Navbar>
            <div className={`${isScrolled ? 'pt-[64px] min-h-[calc(100vh-64px)]' : 'pt-[64px] min-h-[calc(100vh-64px)] @min-[768px]:pt-[72px] @min-[768px]:min-h-[calc(100vh-72px)]'}`}>
                <Outlet></Outlet>
            </div>
            <MainFooter></MainFooter>
        </div>
    );
};

export default MainLayouts;