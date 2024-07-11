
import { IoIosStar } from "react-icons/io";
// eslint-disable-next-line react/prop-types
function PremiumButton({ role, handlePremium }) {
  return (
    <div>
      {role === "guest" && (
        <button
          onClick={handlePremium}
          className="bg-yellow-300 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg "
        >
          Request Premium
        </button>
      )}
      {role === "Requested" && (
        <button
          disabled
          className="bg-gray-300 px-2 py-1 rounded-lg hover:bg-gray-300"
        >
          Requested Premium
        </button>
      )}
      {role === "premium" && (
        <button
          disabled
          className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300"
        >
          <div className="flex gap-2 items-center">
            Premium Member
            <IoIosStar color="gold" />
          </div>
        </button>
      )}
    </div>
  );
}

export default PremiumButton