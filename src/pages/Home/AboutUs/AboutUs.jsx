const AboutUsWithBackground = () => {
  return (
    <section
      className="relative bg-cover bg-center max-w-[1536px] mx-auto bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
      }}
      aria-labelledby="aboutus-heading"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 bg-opacity-60"></div>

      {/* Content */}
      <div className="relative mx-auto px-6 py-20 text-white flex flex-col lg:flex-row items-center gap-12 min-h-[400px]">
        {/* Left (optional image or empty for focus on text) */}
        <div className="lg:w-1/2 w-full">
          {/* If you want an image here, else remove this div */}
        </div>

        {/* Right (text content) */}
        <div className="lg:w-1/2 w-full max-w-lg">
          <h2
            id="aboutus-heading"
            className="text-5xl font-extrabold mb-6 leading-tight"
          >
            About Us
          </h2>
          <p className="text-lg mb-6 leading-relaxed">
            At <span className="font-semibold">Employetica</span>, we believe
            our people are our greatest asset. Founded on principles of
            transparency, integrity, and innovation, we aim to create a
            supportive environment where employees thrive, collaborate, and grow.
          </p>
          <p className="text-base mb-6 leading-relaxed text-gray-300">
            Our management system ensures smooth communication between employees,
            HR, and admins, helping us monitor workloads efficiently while
            fostering career development and job satisfaction.
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-300">
            <li>Committed to employee growth and transparent communication</li>
            <li>Leveraging technology to improve productivity and accountability</li>
            <li>Providing a secure and role-based access system for all users</li>
            <li>Supporting a culture of continuous feedback and improvement</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUsWithBackground;
