import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaGithub } from "react-icons/fa";
import Logo from "../../shared/Logo/Logo";

const Footer = () => (
  <footer className="bg-neutral py-12">
    <div className="max-w-[1536px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:py-[10px] gap-8">
      
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
          <li><a href="/" className="hover:text-secondary cursor-pointer">Home</a></li>
          <li><a href="/dashboard" className="hover:text-secondary cursor-pointer">Dashboard</a></li>
          <li><a href="/contact-us" className="hover:text-secondary cursor-pointer">Contact Us</a></li>
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
        <h5 className="font-semibold mb-3">font-bold text-lg text-neutral-content/90 mb-3</h5>
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
          <a href="#" className="hover:text-[#0077B5] transition-colors duration-300">
            <FaLinkedinIn />
          </a>
          <a href="#" className="hover:text-[#171515] transition-colors duration-300">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-[#1877F2] transition-colors duration-300">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-[#1DA1F2] transition-colors duration-300">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
