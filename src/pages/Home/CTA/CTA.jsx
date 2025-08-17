import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-[40px] @min-[790px]:py-20 rounded bg-gradient-to-tl to-primary/60 from-secondary/45  text-white max-w-[1536px] mx-auto mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-primary-content text-4xl font-extrabold mb-6">
          Ready to Streamline Your Workforce?
        </h2>
        <p className="text-lg text-primary-content/80 mb-8">
          Empower your team, manage payroll, track tasks, and boost productivity — all from one secure platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={'/register'} className="btn btn-md lg:btn-lg btn-primary">
            Get Started
          </Link>
          <Link to={'/contact-us'} className="btn btn-md lg:btn-lg btn-primary btn-outline btn-white">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
