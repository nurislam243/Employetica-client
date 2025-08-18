import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaGithub } from "react-icons/fa";
import Logo from "../../shared/Logo/Logo";
import { Link } from "react-router";

const Footer = () => (
  <footer className="bg-neutral py-12 px-3 @min-[280px]:px-[14px] @min-[350px]:px-4 @min-[400px]:px-5 @min-[500px]:px-8 @min-[1580px]:px-0">
    <div className="max-w-[1536px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:py-[10px] gap-8">
      
      {/* Company Info */}
      <div className="space-y-3">
        <div className="">
          <Logo></Logo>
        </div>
        <p className="text-sm text-neutral-content/85">
          © {new Date().getFullYear()} Employetica.  
          All rights reserved.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="text-neutral-content/95">
        <h5 className="font-bold text-lg text-neutral-content mb-3">Important Links</h5>
        <ul className="space-y-4 text-base">
          <li><Link to={"/"} className="hover:text-secondary cursor-pointer">Home</Link></li>
          <li className="hover:text-secondary cursor-pointer"><Link to={'/all-update'}>All Update</Link></li>
          <li><Link to={"/dashboard"} className="hover:text-secondary cursor-pointer">Dashboard</Link></li>
        </ul>
      </div>

      {/* Others Outline */}
      <div className="text-neutral-content/95">
        <h5 className="font-bold text-lg text-neutral-content mb-3">Others</h5>
        <ul className="space-y-4 text-base">
          <li><Link to={"/all-services"} className="hover:text-secondary cursor-pointer">All Services</Link></li>
          <li><Link to={'/blogs'} className="hover:text-secondary cursor-pointer">Blogs</Link></li>
          <li><Link to={"/contact-us"} className="hover:text-secondary cursor-pointer">Contact Us</Link></li>
        </ul>
      </div>

      {/* Newsletter & Contact */}
      <div>
        <h5 className="font-bold text-lg text-neutral-content mb-3">Stay Connected</h5>
        {/* <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered input-sm flex-grow"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">Subscribe</button>
        </form> */}
        <div className="flex flex-col mt-4 gap-4 text-xl text-neutral-content/95">
          <a href="https://www.linkedin.com/in/md-nur-islam1/" className="hover:text-[#0077B5] transition-colors duration-300 flex gap-2 items-center" target="blank">
            <FaLinkedinIn /> <span className="text-base">Linkedin</span>
          </a>
          <a href="https://github.com/nurislam243" className="hover:text-secondary transition-colors duration-300 flex gap-2 items-center" target="blank">
            <FaGithub /> <span className="text-base">Github</span>
          </a>
          <a href="https://www.facebook.com/nur.islam.568309/" className="hover:text-[#1877F2] transition-colors duration-300 flex gap-2 items-center" target="blank">
            <FaFacebookF /> <span className="text-base">Facebook</span>
          </a>
          <a href="https://x.com/MdNurIslam55434" className="hover:text-[#1DA1F2] transition-colors duration-300 flex gap-2 items-center" target="blank">
            <FaTwitter /> <span className="text-base">Facebook</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
