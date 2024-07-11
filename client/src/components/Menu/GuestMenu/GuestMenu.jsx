import { FaEye, FaUserEdit } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


function GuestMenu() {
  const {user} = useAuth()
  return (
    <div>
      <div className=" px-3 py-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to={`edit-biodata`}
              end
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-darkPink  hover:bg-gray-100  group"
              }
            >
              <FaUserEdit />
              <span className="ms-3">Edit Biodata</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`my-biodata`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg  group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-darkPink  group"
              }
            >
              <FaEye />
              <span className="flex-1 ms-3 whitespace-nowrap">
                View BioData
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`my-contact-request/${user?.email}`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-darkPink group"
              }
            >
              <FaCodePullRequest />
              <span className="flex-1 ms-3 whitespace-nowrap">
                My Contact Request
              </span>
            </NavLink>
          </li>
          <li></li>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-darkPink group"
              }
            >
              <IoHomeSharp />
              <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GuestMenu