const AboutUs = () => {
  return (
    <section className="py-16 px-4 md:px-10 rounded max-w-[1536px] mx-auto shadow-md">
      <div className="grid md:grid-cols-2 gap-10 2xl:gap-14 items-start">
        
        {/* Left Side */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-3">About Employetica</h2>
            <p className="text-base-content text-lg leading-relaxed">
              <strong>Employetica</strong> is our in-house employee management platform built to enhance internal operations.
              Employees can manage their tasks, HR handles recruitment and payroll, and Admins oversee the entire workflow —
              all from a unified, secure system.
            </p>
          </div>
          <div className="divider divider-start text-primary">Team Collaboration</div>
          <img
            src="https://i.ibb.co/mF6rcRQ0/photo-1629904853716-f0bc54eea481.jpg"
            alt="Employee Working"
            className="w-full h-52 object-cover rounded shadow-md"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col-reverse md:flex-col gap-4">
          <img
            src="https://i.ibb.co/1JsWRsCr/pexels-fauxels-3184360-min.jpg"
            alt="Team Meeting"
            className="w-full h-52 object-cover rounded shadow-md"
          />
          <div className="divider divider-start text-primary">Empowering Management</div>
          <p className="text-base-content leading-relaxed">
            With Employetica, our company gains transparency and control in every aspect of workforce management —
            from real-time analytics, task delegation, leave tracking to salary processing. It’s a comprehensive solution
            to modernize and optimize your organization’s internal ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
