import { HiMenuAlt2 } from "react-icons/hi";
import logo from "../../src/assets/imgs/logo.png";
import { FaSearch } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { RiVideoUploadFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  // Search-related state and functions have been removed.
  // The state below is kept to show the existence of a search bar.
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="flex w-full max-w-screen items-center justify-between px-4 sm:px-[2%] py-2 md:py-3 sticky top-0 z-20 bg-white shadow">
      {/* Left section: Hamburger menu and logo */}
      <div className="flex items-center gap-4">
        {/* The hamburger menu button is now only visible on md screens and up */}
        <button
          onClick={() => {
            setSidebar((prev) => !prev);
          }}
          className="hidden md:block cursor-pointer"
        >
          <HiMenuAlt2 className="text-2xl text-gray-600" />
        </button>
        <Link to={"/"}>
          <img src={logo} alt="YouTube Logo" className="h-6 md:h-8" />
        </Link>
      </div>

      {/* Middle section: Search bar (now a static UI element) */}
      <div className="hidden md:flex flex-grow items-center justify-center">
        <div className="flex items-center w-[500px] max-w-2xl border border-gray-500 rounded-full overflow-hidden focus-within:border-black">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow text-gray-900 bg-white px-4 py-2 outline-none border-none"
          />
          <button className="text-gray-700 p-2 px-6 transition-colors cursor-pointer">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Right section: Icons (hidden on small screens, condensed for mobile) */}
      <div className="flex items-center gap-4 text-black">
        {/* Mobile search icon - now a static UI element without functionality */}
        <button className="text-xl md:hidden">
          <FaSearch />
        </button>
        <BiCategory className="text-2xl hidden md:block cursor-pointer" />
        <RiVideoUploadFill className="text-2xl hidden md:block cursor-pointer" />
        <IoMdNotifications className="text-2xl hidden md:block cursor-pointer" />
        <CgProfile className="text-2xl cursor-pointer" />
      </div>

      {/* Mobile search bar overlay has been removed from the component */}
    </nav>
  );
};

export default Navbar;
