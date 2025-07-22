import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import useUserRole from '../../../hooks/useUserRole';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  {
    id: 4,
    title: "Performance Analytics",
    subtitle: "Analyze team performance and identify improvement areas easily.",
    image: "https://images.unsplash.com/photo-1603791452906-b71c059d8b3e?auto=format&fit=crop&w=1500&q=80",
    buttonText: "Analyze Now",
  },
  {
    id: 5,
    title: "Easy Leave Management",
    subtitle: "Employees can request and track leave status seamlessly.",
    image: "https://images.unsplash.com/photo-1603357461634-36b8cb80b3d5?auto=format&fit=crop&w=1500&q=80",
    buttonText: "Request Leave",
  },
];

const Banner = () => {
  const { role } = useUserRole();
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(8);
  const swiperRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(intervalRef.current);
  }, [activeIndex]);

  const startCountdown = () => {
    setCountdown(8);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          swiperRef.current?.slideNext();
          return 8;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="h-[83vh] w-full relative group">
      {/* Custom Navigation Buttons & Slide Number */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          className="custom-swiper-button-prev bg-white/60 hover:bg-white text-primary cursor-pointer p-3 rounded-full shadow-lg transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <span className="text-white font-semibold text-lg">
          {activeIndex + 1}/{slides.length}
        </span>
        <button
          className="custom-swiper-button-next bg-white/60 hover:bg-white cursor-pointer text-primary p-3 rounded-full shadow-lg transition"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Countdown Timer (Bottom Right) */}
      <div className="absolute flex items-center bottom-9 right-2 @min-[400px]:bottom-8 @min-[400px]:right-6 z-20 border-2 text-primary font-extrabold px-[7px] @min-[320px]:px-[8px] py-[1px] @min-[360px]:px-3 @min-[360px]:py-1 rounded-full text-base @min-[340px]:text-xl @min-[400px]:text-2xl @min-[550px]:text-3xl ">
        {countdown}
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        speed={800} 
        navigation={{
          prevEl: '.custom-swiper-button-prev',
          nextEl: '.custom-swiper-button-next',
        }}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[83vh] w-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 text-center text-white px-4 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                <button className="bg-primary hover:bg-primary/50 cursor-pointer text-white px-5 py-[9px] rounded-lg font-medium shadow-lg transition duration-300">
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
