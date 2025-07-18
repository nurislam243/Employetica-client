import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ContactUs = () => {
   const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.post('/contact-us', formData);
      console.log(res.data);

      if (res.data.success) {
        Swal.fire('Success', 'Your message has been sent!', 'success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        Swal.fire('Error', 'Failed to send message.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="bg-base-100 w-full">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 px-4">
        <div className="max-w-[1536px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let’s Connect</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Got a question? Need support or want to leave feedback? Fill out the form or reach us directly. We’re always happy to help you.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-[1536px] mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Info */}
        <div
          className="relative rounded-lg overflow-hidden text-white p-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}
        >
          <div className="absolute inset-0 bg-black/75 bg-opacity-60 z-0" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold mb-6">Employetica Headquarters</h3>

            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-secondary text-xl" />
                <p>1234 Corporate Blvd, Gulshan, Dhaka</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-secondary text-xl" />
                <p>+880 1234-567890</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-secondary text-xl" />
                <p>support@employetica.com</p>
              </div>
              <p className="pt-4">Office Hours: Sun - Thu (9:00 AM - 6:00 PM)</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-6">
              <a href="#" className="hover:text-secondary"><FaFacebookF /></a>
              <a href="#" className="hover:text-secondary"><FaTwitter /></a>
              <a href="#" className="hover:text-secondary"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-base-200 rounded-lg shadow-lg p-10 space-y-6">
          <h3 className="text-2xl font-bold text-center text-primary mb-2">Send Us a Message</h3>
           {/* Form with onChange handlers */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text font-medium">Your Name</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text font-medium">Your Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text font-medium">Message</span>
          </label>
          <textarea
            name="message"
            className="textarea textarea-bordered w-full"
            rows="5"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">Submit Message</button>
      </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
