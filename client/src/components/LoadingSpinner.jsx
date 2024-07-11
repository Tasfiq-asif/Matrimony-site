
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
function LoadingSpinner({smallHeight}) {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <BeatLoader />
    </div>
  )}
  LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
}

export default LoadingSpinner