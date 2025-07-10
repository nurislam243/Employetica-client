import React from 'react';
import Services from '../Services/Services';
import Banner from '../Banner/Banner';
import CompanyAchievements from '../CompanyAchievements/CompanyAchievements';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <CompanyAchievements></CompanyAchievements>
        </div>
    );
};

export default Home;