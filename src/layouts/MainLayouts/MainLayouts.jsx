import { Outlet } from 'react-router';
import Footer from '../../components/common/Footer/Footer';
import MainNavbar from '../../components/common/MainNavbar/MainNavbar';

const MainLayouts = () => {
    return (
        <div>
            <MainNavbar></MainNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;