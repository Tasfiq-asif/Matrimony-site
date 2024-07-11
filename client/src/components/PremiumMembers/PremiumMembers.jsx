
import { useEffect, useState } from "react";
import BiodataCard from "../BiodataCard/BiodataCard";
import { FaStar } from "react-icons/fa";
import useaxiosCommon, { axiosCommon } from "../../hooks/useAxiosCommon";
import { motion } from "framer-motion";
function PremiumMembers() {

    const asiosCommon = useaxiosCommon()
     const [biodatas, setBiodatas] = useState([]);
     const [sortOrder, setSortOrder] = useState("asc");

     useEffect(() => {
       const fetchBiodatas = async () => {
         try {
           const response = await axiosCommon.get("/premium-users-biodata");
           setBiodatas(response.data);
         } catch (error) {
           console.error("Error fetching biodata:", error);
         }
       };

       fetchBiodatas();
     }, []);
     console.log(biodatas)
     const handleSort = (order) => {
       setSortOrder(order);
       const sortedBiodatas = [...biodatas].sort((a, b) => {
         const ageA = new Date().getFullYear() - new Date(a.dob).getFullYear();
         const ageB = new Date().getFullYear() - new Date(b.dob).getFullYear();
         return order === "asc" ? ageA - ageB : ageB - ageA;
       });
       setBiodatas(sortedBiodatas);
     };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="border-2 border-lightPink ml-3 mr-3 mb-8 mt-12 rounded-xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-darkPurple mt-4">
          OUR PREMIUM MEMBERS
        </h2>
        <div className="flex flex-end justify-center">
          <button
            className="m-2 py-1 px-2 bg-white border border-darkPink rounded-xl hover:bg-white hover:text-darkPink"
            onClick={() => handleSort("asc")}
          >
            Age Low to High
          </button>
          <button
            className="m-2 py-1 px-2 bg-white border border-darkPink rounded-xl hover:bg-white hover:text-darkPink"
            onClick={() => handleSort("desc")}
          >
            Age High to Low
          </button>
        </div>
        <div className="mx-auto flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto justify-around gap-8 lg:gap-12 mt-8 max-w-4xl ">
            {biodatas.slice(0, 6).map((biodata) => (
              <motion.div
                key={biodata._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BiodataCard data={biodata} icon={FaStar} showIcon={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumMembers