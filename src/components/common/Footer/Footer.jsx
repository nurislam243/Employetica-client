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
      <div>
        <h5 className="font-bold text-lg text-neutral-content/90 mb-3">Quick Links</h5>
        <ul className="space-y-2 text-sm">
          <><Link to={"/"} className="hover:text-secondary cursor-pointer">Home</Link></>
          <li><Link to={"/dashboard"} className="hover:text-secondary cursor-pointer">Dashboard</Link></li>
          <li><Link to={"/contact-us"} className="hover:text-secondary cursor-pointer">Contact Us</Link></li>
        </ul>
      </div>

      {/* Services Outline */}
      <div>
        <h5 className="font-bold text-lg text-neutral-content/90 mb-3">Services</h5>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-secondary cursor-pointer">Payment Tracking</li>
          <li className="hover:text-secondary cursor-pointer">Performance Monitoring</li>
          <li className="hover:text-secondary cursor-pointer">Role‑Based Access</li>
        </ul>
      </div>

      {/* Newsletter & Contact */}
      <div>
        <h5 className="font-bold text-lg text-neutral-content/90 mb-3">Stay Connected</h5>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered input-sm flex-grow"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">Subscribe</button>
        </form>
        <div className="flex mt-4 gap-4 text-xl">
          <a href="https://www.linkedin.com/in/md-nur-islam1/" className="hover:text-[#0077B5] transition-colors duration-300" target="blank">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/nurislam243" className="hover:text-[#171515] transition-colors duration-300" target="blank">
            <FaGithub />
          </a>
          <a href="https://www.facebook.com/nur.islam.568309/" className="hover:text-[#1877F2] transition-colors duration-300" target="blank">
            <FaFacebookF />
          </a>
          <a href="https://x.com/MdNurIslam55434" className="hover:text-[#1DA1F2] transition-colors duration-300" target="blank">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
