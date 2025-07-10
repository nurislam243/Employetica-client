import React from 'react';
import Services from '../Services/Services';
import Banner from '../Banner/Banner';
import CompanyAchievements from '../CompanyAchievements/CompanyAchievements';
import TestimonialSection from '../TestimonialSection/TestimonialSection';
import AboutUs from '../AboutUs/AboutUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <CompanyAchievements></CompanyAchievements>
            <AboutUs></AboutUs>
            <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Home;