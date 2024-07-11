import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner-2.jpeg";
import { motion } from "framer-motion";
function Hero() {
  return (
    <div
      className="relative bg-cover bg-center h-[75vh]"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to MatchMaker</h1>
        <p className="text-lg">Find Your Perfect Match Today</p>
        <Link to={"/signup"}>
          <motion.button
            className="mt-6 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Hero;
