
import { IoHomeSharp } from "react-icons/io5";
import { MdContactPhone, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiUsers } from "react-icons/hi2";
import { TbUserStar } from "react-icons/tb";


function AdminMenu() {
  return (
    <div>
      <div className=" px-3 py-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="admin-home"
              end
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:text-darkPink  hover:bg-gray-100  group"
              }
            >
              <MdSpaceDashboard />
              <span className="ms-3">Dasboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`manage-users`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg  group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-darkPink  group"
              }
            >
              <HiUsers />
              <span className="flex-1 ms-3 whitespace-nowrap">Manage User</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`premium-request`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg  group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-darkPink  group"
              }
            >
              <TbUserStar />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Approved Premium{" "}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"approve-contact-request"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg  group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:text-darkPink  group"
              }
            >
              <MdContactPhone />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Approved Contact Request
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2 text-white bg-darkPink rounded-lg   hover:bg-darkPink  group"
                  : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100  group"
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

export default AdminMenu