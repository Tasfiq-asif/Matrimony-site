import { useQuery } from "@tanstack/react-query"
import useaxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/LoadingSpinner";
import calculateAge from "../../utils/calculateAge";
import { useState } from "react";
import BiodataCard from "../../components/BiodataCard/BiodataCard";
import {  RiMenuFold2Line } from "react-icons/ri";
import Header from "../../components/Header/Header";
import { FaStar } from "react-icons/fa";


function Biodatas() {
  const axiosCommon = useaxiosCommon();
  const [biodatas,setBiodatas] = useState([])
  const [minAge,setMinAge] = useState('')
  const [maxAge,setMaxAge] = useState('')
  const [gender, setGender] = useState("Select Gender");
  const [division,setDivision] = useState("Select division");
  const [menuOpen,setMenuOpen]= useState(false)

const {isLoading} = useQuery({
  queryKey: ['biodatas'],
  queryFn: async () => {
    const {data} = await axiosCommon('/biodatas');
    const biodatasWithAge = data.map(biodata =>({
      ...biodata,
      age: calculateAge(biodata.dob)
    }))
    setBiodatas(biodatasWithAge)
    return data
  }
})

const handleGenderChange =(e) => {
  setGender(e.target.value)
}
const handleDivisionChange =(e) => {
  setDivision(e.target.value)
}
const handleminAgeChange =(e) => {
  setMinAge(e.target.value)
}
const handlemaxAgeChange =(e) => {
  setMaxAge(e.target.value)
}

 const handleResetFilters = () => {
   setMinAge("");
   setMaxAge("");
   setGender("Select Gender");
   setDivision("Select division");
 };

const filteredData = biodatas.filter(biodata => {
  const genderMatch = gender === "Select Gender" || gender === biodata.gender;
  const divisionMatch =
    division === "Select division" || division === biodata.permanentDiv;
  const ageMatch = (minAge ==='' || biodata.age >= minAge) && (maxAge === "" || biodata.age <= maxAge) 
  return genderMatch && ageMatch && divisionMatch 

})

 const toggleMenu = ()=>{
  setMenuOpen(!menuOpen)
 } 

if (isLoading) return <LoadingSpinner />;
  
return (
  <div className="flex">
    {/* Filter section */}

    <section
      className={`w-full  bg-pink-100 md:block xl:w-[300px] lg:w-[300px] border md:w-[300px] h-screen p-4 ${
        menuOpen ? "block" : "hidden"
      }`}
    >
      {/* Gender */}
      <div className="md:px-10 mx-auto mt-4 ">
        <label
          htmlFor="gender"
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          Gender
        </label>

        <select
          name="gender"
          value={gender}
          onChange={handleGenderChange}
          className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70  rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        >
          <option value="Select Gender">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Permanent Division */}
      <div className="md:px-10 mx-auto mt-4 ">
        <label
          htmlFor="permanentDiv"
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          Permanent Division Name
        </label>

        <select
          name="permanentDiv"
          value={division}
          onChange={handleDivisionChange}
          className="block bg-gray-50 mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
        >
          <option value="Select division">Select division</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Chattagram">Chattagram</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Sylhet">Sylhet</option>
        </select>
      </div>

      {/* Age */}
      <div className="md:px-10 mx-auto mt-4 ">
        <label
          htmlFor="Age"
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          Age
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minage"
            value={minAge}
            placeholder="Min Age"
            onChange={handleminAgeChange}
            className="block text-sm bg-gray-50 mt-2 w-1/2 placeholder-gray-400/70  rounded-lg border border-gray-200  py-2.5 text-center text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            id=""
          />
          <input
            type="number"
            name="maxage"
            value={maxAge}
            placeholder="Max Age"
            onChange={handlemaxAgeChange}
            inputMode="numeric"
            className="block bg-gray-50 text-sm mt-2 w-1/2 placeholder-gray-400/70  rounded-lg border border-gray-200 text-center py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            id=""
          />
        </div>
      </div>
      <div className=" md:px-10 mx-auto mt-4 flex justify-end">
        <button
          onClick={handleResetFilters}
          className="button py-2 px-5 rounded-2xl border-darkPink bg-transparent border hover:bg-transparent transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:text-slate-500 "
        >
          Reset
        </button>

        {menuOpen && (
          <button
            onClick={toggleMenu}
            className="button ml-4 py-2 px-5 rounded-2xl border-darkPink bg-transparent border hover:bg-transparent transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:text-slate-500 "
          >
            Done
          </button>
        )}
      </div>
    </section>

    <section className="flex-1">
      <div className="hidden md:block">
        <Header title={"All Biodatas"} />
      </div>
      <div
        className="md:hidden flex justify-between items-center w-full bg-pink-100 p-4
      mb-4"
      >
        {!menuOpen && (
          <h2 className="text-lg font-bold text-customPurple">Filters</h2>
        )}
        <button
          onClick={toggleMenu}
          className="focus:outline-none text-black border text-xl bg-transparent transition hover:bg-transparent duration-300 ease-in-out hover:scale-125"
        >
          {!menuOpen && <RiMenuFold2Line />}
        </button>
      </div>
      <div
        className={`flex ${
          menuOpen ? "hidden" : "block"
        } justify-center md:justify-start  flex-wrap gap-12 ml-3`}
      >
        {filteredData.map((biodata) => (
          <BiodataCard key={biodata._id} data={biodata} icon= {FaStar} showIcon={false} />
        ))}
      </div>
    </section>
  </div>
);
}

export default Biodatas