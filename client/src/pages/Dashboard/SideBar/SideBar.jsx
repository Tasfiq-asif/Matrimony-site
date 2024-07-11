import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AdminMenu from "../../../components/Menu/AdminMenu/AdminMenu";
import GuestMenu from "../../../components/Menu/GuestMenu/GuestMenu";


function SideBar() {

    const {logOut} = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [role] =useRole()

    

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest("#sidebar-multi-level-sidebar") &&
        !event.target.closest("button")
      ) {
        setIsSidebarOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isSidebarOpen]);
  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className=" bg-transparent inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <RxHamburgerMenu />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-[300px] h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-screen flex justify-between flex-col bg-gray-50 dark:bg-gray-800">
          
        { role === "admin" ? <AdminMenu/> : <GuestMenu/>}
          <div className=" px-3 py-4 overflow-y-auto ">
            <ul>
              <li>
                <button
                  onClick={logOut}
                  to="#"
                  className="flex items-center p-2 text-white  rounded-lg group"
                >
                  <MdOutlineLogout />
                  <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
