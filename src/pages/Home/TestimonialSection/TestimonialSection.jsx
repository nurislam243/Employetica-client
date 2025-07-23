import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: "Sarah Rahman",
    position: "Software Engineer",
    text: "This platform made tracking my daily work so effortless. HR feedback is faster and payments are timely!",
    image: "https://i.ibb.co/TDP7gDWf/68-1.jpg",
  },
  {
    id: 2,
    name: "Jahidul Hasan",
    position: "Frontend Developer",
    text: "I love how organized everything is. Logging tasks and viewing performance data is super easy.",
    image: "https://i.ibb.co/7Nx1sxkr/45.jpg",
  },
  {
    id: 3,
    name: "Maya Akter",
    position: "Digital Marketer",
    text: "The system makes sure HR and employees are always in sync. Transparent and intuitive!",
    image: "https://i.ibb.co/Q7nYvBzD/55.jpg",
  },
  {
    id: 4,
    name: "Tanvir Ahmed",
    position: "HR Executive",
    text: "As an HR, managing employees, verifying them, and processing payments has never been easier.",
    image: "https://i.ibb.co/TBSV38nb/34.jpg",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    position: "Admin",
    text: "Powerful control panel! I can track everything from employee roles to monthly payroll approvals.",
    image: "https://i.ibb.co/1fvWqdhT/41.jpg",
  },
];

const Testimonial = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-12 text-center relative max-w-[1536px] mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
        Trusted by Employees, HRs & Admins
      </h2>
      <p className="text-base-content/90 mb-10">Real stories from real users</p>

      {/* Arrow buttons */}
      <div className="flex justify-end mr-5">
        <div className="space-x-4">
          <button ref={prevRef} className="bg-white shadow hover:bg-gray-100 p-3 rounded-full">
            <FaArrowLeft className="text-xl text-primary" />
          </button>
          <button ref={nextRef} className="bg-white shadow hover:bg-gray-100 p-3 rounded-full">
            <FaArrowRight className="text-xl text-primary" />
          </button>
        </div>
      </div>

      {/* Swiper slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        spaceBetween={30}
        autoplay={{ delay: 3000, disableOnInteraction: false,  pauseOnMouseEnter: true }}
        pagination={{ el: '.custom-pagination', clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full mx-auto"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`p-6 rounded mt-9 shadow border border-base-content/10 transition-transform duration-300 ease-in-out flex flex-col items-center text-center
                ${isActive ? 'bg-base-300/80 hover:bg-base-300' : 'bg-base-200 opacity-60'}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full mb-4 border-2 border-primary object-cover"
                />
                <div className="text-4xl text-primary mb-2">“</div>
                <p className="text-base-content mb-4 italic">{item.text}</p>
                <h4 className="font-semibold text-primary">{item.name}</h4>
                <p className="text-sm text-base-content/80">{item.position}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots */}
      <div className="mt-7 mx-auto max-w-[110px] flex items-center justify-center gap-4">
        <div className="custom-pagination flex gap-2" />
      </div>
    </section>
  );
};

export default Testimonial;
