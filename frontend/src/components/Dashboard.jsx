const Banner = () => {
  return (
    <section className="relative w-full pt-28 pb-20 px-6 md:px-12 bg-gradient-to-b from-blue-50 to-white dark:from-[#0b0f18] dark:to-[#111827] transition-all duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
            Take Control of Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
              Financial Future
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
            Track income, manage expenses, and get AI-driven insights for
            smarter saving and investing — all in one powerful dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 hover:shadow-[0_0_20px_#2563eb80] transition-all duration-300">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 opacity-20 blur-3xl"></div>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/financial-growth-3d-illustration-6276081-5195437.png"
              alt="Finance Growth"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
