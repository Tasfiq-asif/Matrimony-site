import { FaBriefcase } from "react-icons/fa";
import calculateAge from "../../utils/calculateAge";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const BiodataCard = ({ data, icon: Icon,showIcon }) => {
  // eslint-disable-next-line react/prop-types
  const { biodataId, name, dob, permanentDiv, occupation, _id } = data;

  const age = calculateAge(dob);
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/biodatas/${id}`);
  };

  return (
    <div>
      <div className="flex h-[200px] w-[370px] max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div
          className="w-[160px] bg-cover"
          style={{
            // eslint-disable-next-line react/prop-types
            backgroundImage: `url(${data.imageUrl})`,
          }}
        ></div>

        <div className="w-2/3 p-4 md:p-4">
          <div className="flex justify-between">
            <div className="flex gap-1 ">
              <p className=" text-sm font-bold text-black  text-center dark:text-gray-400 ">
                #Biodata ID:
              </p>
              <p className=" text-sm text-white w-6 rounded-lg text-center dark:text-gray-400 bg-customPurple">
                {biodataId}
              </p>
            </div>
            {Icon && showIcon && (
              <div>
                <Icon color={"gold"} />
              </div>
            )}
          </div>
          <h1 className="text-lg mt-3 font-bold text-gray-800 dark:text-white">
            {name}
          </h1>

          <h1 className="text-md font-bold text-gray-800 dark:text-white mt-3">
            Age: <span className="font-normal">{age}</span>
          </h1>
          <h1 className="text-md font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FaBriefcase size={14} />{" "}
            <span className="font-normal">{occupation}</span>
          </h1>

          <div className="flex justify-between mt-1 items-center">
            <h1 className="text-md font-bold text-gray-800 dark:text-white flex items-center gap-1">
              <FaLocationDot size={14} />
              <span className="font-normal">{permanentDiv}</span>
            </h1>
            <button
              onClick={() => handleViewDetails(_id)}
              className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-darkPink rounded dark:bg-gray-700 hover:bg-lightPink dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataCard;