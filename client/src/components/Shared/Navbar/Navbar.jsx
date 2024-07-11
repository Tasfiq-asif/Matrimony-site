import { useState } from "react";
import logo from "../../../assets/logo.png"
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";


function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {user,logOut} = useAuth()

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const [role] = useRole();
    let to = "/dashboard/edit-biodata";
    if (user && role === "admin") {
      to = "/dashboard/admin-home";
    }

   

    const navItems = (
      <>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white  bg-lightPink rounded md:bg-transparent md:text-darkPink md:p-0"
                : "block py-2 px-3 hover:text-white md:text-gray-900 md:hover:text-darkPink rounded hover:bg-lightPink md:hover:bg-transparent"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/biodatas"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-lightPink rounded md:bg-transparent md:text-darkPink md:p-0"
                : "block py-2 px-3 md:text-gray-900 hover:text-white md:hover:text-darkPink rounded hover:bg-lightPink md:hover:bg-transparent"
            }
          >
            Biodatas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-lightPink rounded md:bg-transparent md:text-darkPink md:p-0"
                : "block py-2 px-3 md:text-gray-900 hover:text-white md:hover:text-darkPink rounded hover:bg-lightPink md:hover:bg-transparent"
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "block py-2 px-3 text-white bg-lightPink rounded md:bg-transparent md:text-darkPink md:p-0"
                : "block py-2 px-3 md:text-gray-900 hover:text-white md:hover:text-darkPink rounded hover:bg-lightPink md:hover:bg-transparent"
            }
          >
            Contact Us
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-3 text-white bg-lightPink rounded md:bg-transparent md:text-darkPink md:p-0"
                  : "block py-2 px-3 md:text-gray-900 hover:text-white md:hover:text-darkPink rounded hover:bg-lightPink md:hover:bg-transparent"
              }
            >
              Dashboard
            </NavLink>
          </li>
        )}
      </>
    );
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={'/'}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10" alt=" Logo" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? (
              <button
                onClick={logOut}
                type="button"
                className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
              >
                LogOut
              </button>
            ) : (
              <Link to={'/login'}>
                <button
                  type="button"
                  className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                >
                  LogIn
                </button>
              </Link>
            )}

            <button
              onClick={toggleMenu}
              type="button"
              className=" bg-transparent inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar