import { useState } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);
  return (
    <div className="relative">
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div
        className={`w-full h-auto py-6 px-[2%] ${
          sidebar ? "md:pl-[17%]" : "md:pl-[7%]"
        }`}
      >
        <Feed category={category} />
      </div>
    </div>
  );
};

export default Home;
