import React from 'react';
import Services from '../Services/Services';
import Banner from '../Banner/Banner';
import CompanyAchievements from '../CompanyAchievements/CompanyAchievements';
import TestimonialSection from '../TestimonialSection/TestimonialSection';
import AboutUs from '../AboutUs/AboutUs';
import RecentUpdates from '../RecentUpdates/RecentUpdates';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="px-3 @min-[280px]:px-[14px] @min-[350px]:px-4 @min-[400px]:px-5 @min-[500px]:px-8 @min-[1580px]:px-0">
                <Services></Services>
                <CompanyAchievements></CompanyAchievements>
                <RecentUpdates></RecentUpdates>
                <AboutUs></AboutUs>
                <TestimonialSection></TestimonialSection>
            </div>
        </div>
    );
};

export default Home;