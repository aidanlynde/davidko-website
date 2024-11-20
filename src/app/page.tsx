export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-full">
        <img
          src="/chicago.jpg" // Replace with your image file
          alt="Chicago skyline"
          className="hero-image"
        />

        {/* Form Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white p-6 space-y-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-xl mb-6">Fill out the form below to get started!</p>

            {/* Form */}
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              ></textarea>
              <button type="submit" className="w-full py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
