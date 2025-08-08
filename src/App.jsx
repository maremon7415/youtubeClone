import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <Toaster position="bottom-center" />
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />}></Route>
        <Route path="/video/:categoryId/:videoId" element={<Video />}></Route>
      </Routes>
    </>
  );
};

export default App;
