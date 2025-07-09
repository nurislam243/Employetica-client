// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

const slides = [
  {
    id: 1,
    title: "Smart Employee Task Tracking",
    subtitle: "Easily log your daily work and improve team productivity.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1500&q=80",
    buttonText: "Get Started",
  },
  {
    id: 2,
    title: "Streamlined Payroll Management",
    subtitle: "HR and Admin can process salaries securely and efficiently.",
    image: "https://images.unsplash.com/photo-1581092918361-990198bc72f1?auto=format&fit=crop&w=1500&q=80",
    buttonText: "See How It Works",
  },
  {
    id: 3,
    title: "Role-based Access Control",
    subtitle: "Secure your system with tailored access for Admin, HR & Employees.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1500&q=80",
    buttonText: "Explore Features",
  },
];

const Banner = () => {
  return (
    <div className="min-h-[80vh] w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/30 bg-opacity-60"></div>
              <div className="relative z-10 text-center text-white px-4 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition duration-300">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
