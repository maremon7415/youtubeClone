import { api_key } from "../data";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { valueConverter } from "../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [channelData, setChannelData] = useState({});

  const fetchData = async () => {
    try {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${api_key}`;
      const videoResponse = await fetch(videoListUrl);
      const videoData = await videoResponse.json();
      setData(videoData.items);

      if (videoData.items) {
        const uniqueChannelIds = [
          ...new Set(videoData.items.map((item) => item.snippet.channelId)),
        ];
        const channelIdsString = uniqueChannelIds.join(",");

        const channelsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIdsString}&key=${api_key}`;
        const channelsResponse = await fetch(channelsUrl);
        const channelsData = await channelsResponse.json();

        const newChannelData = {};
        channelsData.items.forEach((channel) => {
          newChannelData[channel.id] = channel.snippet.thumbnails.default.url;
        });
        setChannelData(newChannelData);
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:pr-0 md:pr-[2%]">
      {data.map((item, index) => (
        <Link
          key={item.id}
          to={`video/${item.snippet.categoryId}/${item.id}`}
          className="cursor-pointer group"
        >
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>

          <div className="mt-3 flex gap-3">
            {/* Display the channel logo using the fetched channelData */}
            {channelData[item.snippet.channelId] && (
              <img
                src={channelData[item.snippet.channelId]}
                alt={item.snippet.channelTitle}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-gray-900 leading-tight line-clamp-2">
                {item.snippet.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.snippet.channelTitle}
              </p>
              <p className="text-sm text-gray-500">
                {valueConverter(item.statistics.viewCount)} views •{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
