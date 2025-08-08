import { useParams } from "react-router-dom";
import PlayVideo from "../components/PlayVideo";
import Recommended from "../components/Recommended";
import { useEffect } from "react";

const Video = () => {
  const { videoId, categoryId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-4 max-w-7xl mx-auto px-4">
      <div className="flex-1">
        <PlayVideo videoId={videoId} />
      </div>
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
