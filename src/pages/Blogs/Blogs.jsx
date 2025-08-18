import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs data from public folder
  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedBlog]);

  return (
    <section className="px-3 @min-[280px]:px-[14px] @min-[350px]:px-4 @min-[400px]:px-5 @min-[500px]:px-8 @min-[1580px]:px-0">
      <div className="py-12 max-w-[1536px] mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
          Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-base-200 rounded shadow p-4 flex flex-col">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-muted mb-3">
                {blog.date} | {blog.author}
              </p>
              <button
                className="btn btn-sm btn-primary mt-auto"
                onClick={() => setSelectedBlog(blog)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* Custom Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black opacity-60"
              onClick={() => setSelectedBlog(null)}
            />

            {/* Modal Box */}
            <div className="relative bg-base-100 p-6 rounded-lg max-w-lg w-full z-10 overflow-y-auto max-h-[80vh]">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-56 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2 text-primary">{selectedBlog.title}</h3>
              <p className="text-sm text-muted mb-4">
                {selectedBlog.date} | {selectedBlog.author}
              </p>
              <p className="text-base-content">{selectedBlog.description}</p>
              <div className="mt-4 text-right">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => setSelectedBlog(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
