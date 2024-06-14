import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AlignLeft,
  CircleUserRound,
  Linkedin,
  ShoppingCart,
  Moon,
  Sun,
} from "lucide-react"; // Importing Moon and Sun icons for theme toggle
import { signOutUser } from "../../services/firebase";
import { toast } from "react-toastify";
import { resetCart } from "../../redux/cartSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false); // State for theme toggle
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart.cart);
 

  const handleLogout = async () => {
    await signOutUser(dispatch);
    dispatch(resetCart());
    localStorage.removeItem("persist");
    toast.success("Successfully logged out!");
    navigate("/");
  };

  const getUserInitials = (user) => {
    if (user && user.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join("");
    }
    return null;
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
    const selectedTheme = darkTheme ? "dark" : "light";
    applyTheme(selectedTheme); // Apply theme to the entire website
  };

  const applyTheme = (theme) => {
    const body = document.body;

    if (theme === "dark") {
      body.style.backgroundColor = "#000000";
      body.style.color = "orange";
      // Add more styles as needed
      body.style.setProperty("--primary-bg-color", "#000000");
      body.style.setProperty("--primary-text-color", "#ffffff");
    } else {
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#000000";
      // Add more styles as needed
      body.style.setProperty("--primary-bg-color", "#ffffff");
      body.style.setProperty("--primary-text-color", "#000000");
    }
  };

  return (
    <div className="sticky top-0 w-full py-4 bg-white shadow-md z-50">
      <div className="flex justify-center items-center mx-auto px-6">
        <div className="flex justify-between  w-full font-bold items-center max-w-7xl mx-auto">
          <NavLink to="/" className="text-xl md:text-3xl">
            Nourish <span className="text-orange-500">Net</span>
          </NavLink>
          <div className="md:flex font-bold justify-center items-center flex-1 gap-8 text-sm hidden">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500 transition-colors duration-300"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "text-gray-700 hover:text-orange-500 transition-colors duration-300"
              }
            >
              Contact
            </NavLink>
            {isAuthenticated ? (
              <NavLink
                onClick={handleLogout}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500 transition-colors duration-300"
                }
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold"
                    : "text-gray-700 hover:text-orange-500 transition-colors duration-300"
                }
              >
                Login
              </NavLink>
            )}
          </div>
          <div className="md:flex gap-5 hidden items-center">
            <button
              className="relative bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={toggleTheme}
            >
              {darkTheme ? <Moon /> : <Sun />}
            </button>
            <Link className="relative bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              {user && user.displayName ? (
                <span className="text-lg font-bold bg-transparent flex items-center justify-center">
                  {getUserInitials(user)}
                </span>
              ) : (
                <CircleUserRound color="black" />
              )}
            </Link>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 relative"
                  : "text-gray-700 hover:text-orange-500 relative"
              }
            >
              <ShoppingCart className="w-8 h-8 flex items-center justify-center" />
              {Cart && Cart.length > 0 && (
                <span className="absolute  z-40 -top-3 px-1 -right-1 rounded-full text-white bg-red-600">
                  {Cart?.length}
                </span>
              )}
            </NavLink>
            <Linkedin
              className="w-8 h-8 flex items-center justify-center"
              color="black"
            />
          </div>

          <div className="flex gap-2">
            <div className="md:hidden flex gap-5 items-center">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 relative"
                    : "text-gray-700 hover:text-orange-500 relative"
                }
              >
                <ShoppingCart
                  className="w-6 h-6 flex items-center justify-center"
                  color="black"
                />
                {Cart && Cart.length > 0 && (
                  <span className="absolute z-40 -top-3 px-1 -right-1 rounded-full text-white bg-red-600">
                    {Cart?.length}
                  </span>
                )}
              </NavLink>

              <button
                className="relative bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={toggleTheme}
              >
                {darkTheme ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <span
                className="cursor-pointer flex items-center justify-center"
                onClick={toggleMenu}
              >
                <AlignLeft className="w-6 h-6" />
              </span>
            </div>
          </div>

          {open && (
            <div className="md:hidden bg-[#f2f2f2] shadow-md z-50 absolute w-full top-full left-0 p-6">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-500 font-semibold"
                    : "block px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
                }
                onClick={toggleMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 text-orange-500 font-semibold"
                    : "block px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
                }
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
              {isAuthenticated ? (
                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-orange-500 font-semibold"
                      : "block px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
                  }
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-orange-500 font-semibold"
                      : "block px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors duration-300"
                  }
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
