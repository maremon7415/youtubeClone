import { MdHome } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { IoMdBasketball } from "react-icons/io";
import { FiTv } from "react-icons/fi";
import { GrTechnology } from "react-icons/gr";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { RiPhoneCameraFill } from "react-icons/ri";
import { IoNewspaper } from "react-icons/io5";

// Placeholder images for the subscriptions section
import Jack from "../../src/assets/imgs/jack.png";
import megan from "../../src/assets/imgs/megan.png";
import simon from "../../src/assets/imgs/simon.png";
import tom from "../../src/assets/imgs/tom.png";
import cameron from "../../src/assets/imgs/cameron.png";

const Sidebar = ({ sidebar, category, setCategory }) => {
  // Data array for the main menu links
  const mainLinks = [
    { icon: <MdHome />, text: "Home", id: 0 },
    { icon: <IoGameController />, text: "Gaming", id: 20 },
    { icon: <FaCarSide />, text: "Automobiles", id: 2 },
    { icon: <IoMdBasketball />, text: "Sports", id: 17 },
    { icon: <FiTv />, text: "Entertainment", id: 24 },
    { icon: <GrTechnology />, text: "Technology", id: 28 },
    { icon: <MdOutlineLibraryMusic />, text: "Music", id: 10 },
    { icon: <RiPhoneCameraFill />, text: "Blogs", id: 23 },
    { icon: <IoNewspaper />, text: "News", id: 25 },
  ];

  // Data array for the subscribed channels
  const subscriptions = [
    { img: Jack, name: "PewDiePie" },
    { img: simon, name: "Mr Beast" },
    { img: tom, name: "Justin Bieber" },
    { img: megan, name: "5-Minute Crafts" },
    { img: cameron, name: "Nas Daily" },
  ];

  return (
    <>
      {/* Desktop Sidebar (visible on md screens and up) */}
      <div
        className={`w-full md:w-[15%] h-screen fixed top-0 left-0 pl-[2%] pt-20 overflow-y-auto hidden md:block z-10 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]`}
      >
        {/* Main Menu Links */}
        <div className="py-4">
          {mainLinks.map((item, index) => (
            <div
              onClick={() => setCategory(item.id)}
              key={index}
              className="flex relative items-center mb-2 w-fit flex-nowrap cursor-pointer text-gray-500 p-2 rounded-mdtransition-colors duration-200 "
            >
              <div className="text-2xl mr-5">{item.icon}</div>
              <p className={sidebar ? "block" : "hidden"}>{item.text}</p>
              <div
                className={`absolute bg-red-500 w-8 h-1 bottom-0 left-1 ${
                  category === item.id ? "block" : "hidden"
                }`}
              ></div>
            </div>
          ))}
        </div>
        <hr className="border-gray-300 my-1 mr-4" />

        {/* Subscribed Channels */}
        <div className="py-4">
          <h3
            className={`text-gray-700 font-bold mb-5 ${
              sidebar ? "block" : "hidden"
            }`}
          >
            Subscribed
          </h3>
          {subscriptions.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-2 cursor-pointer text-gray-500 p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-6 w-6 rounded-full mr-5"
              />
              <p className={sidebar ? "block" : "hidden"}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Menu (visible on screens less than md) */}
      <div
        className={`w-full bg-gray-400 z-50 flex items-center justify-between p-2 md:hidden overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]`}
      >
        {mainLinks.map((item, index) => (
          <div
            onClick={() => setCategory(item.id)}
            key={index}
            className={`flex w-full justify-between items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              category === item.id
                ? "text-red-500 bg-white/20 backdrop-blur-md border border-white/10 shadow-md"
                : "text-gray-500"
            }`}
          >
            <div className="text-[20px]">{item.icon}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
