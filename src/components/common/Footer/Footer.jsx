import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import Logo from "../../shared/Logo/Logo";

const Footer = () => (
  <footer className="bg-neutral text-neutral-content py-12">
    <div className="max-w-[1536px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* Company Info */}
      <div>
        <div className="">
          <Logo></Logo>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Employetica.  
          All rights reserved.
        </p>
      </div>

      {/* Navigation Links */}
      <div>
        <h5 className="font-semibold mb-3">Quick Links</h5>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:text-secondary">Home</a></li>
          <li><a href="/dashboard" className="hover:text-secondary">Dashboard</a></li>
          <li><a href="/contact-us" className="hover:text-secondary">Contact Us</a></li>
        </ul>
      </div>

      {/* Services Outline */}
      <div>
        <h5 className="font-semibold mb-3">Services</h5>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-secondary">Task Logging</li>
          <li className="hover:text-secondary">Payment Tracking</li>
          <li className="hover:text-secondary">Performance Monitoring</li>
          <li className="hover:text-secondary">Role‑Based Access</li>
        </ul>
      </div>

      {/* Newsletter & Contact */}
      <div>
        <h5 className="font-semibold mb-3">Stay Connected</h5>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered input-sm flex-grow"
            required
          />
          <button type="submit" className="btn btn-sm btn-primary">Subscribe</button>
        </form>
        <div className="flex mt-4 gap-4">
          <a href="#" className="text-xl hover:text-primary"><FaFacebookF /></a>
          <a href="#" className="text-xl hover:text-primary"><FaTwitter /></a>
          <a href="#" className="text-xl hover:text-primary"><FaLinkedinIn /></a>
          <a href="mailto:info@employetica.com" className="text-xl hover:text-primary"><FaEnvelope /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
