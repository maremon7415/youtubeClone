import { useEffect, useState } from "react";
import { api_key, valueConverter } from "../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageToken, setPageToken] = useState("");
  const [totalVideosLoaded, setTotalVideosLoaded] = useState(0);

  const fetchData = async (pageToLoad = "") => {
    setLoadingMore(true);
    setError(null);
    try {
      // The API URL now includes maxResults to control the number of videos per page
      const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=20&key=${api_key}${
        pageToLoad ? `&pageToken=${pageToLoad}` : ""
      }`;

      const response = await fetch(videosUrl);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // If it's the first fetch, replace the data. Otherwise, append.
      if (!pageToLoad) {
        setApiData(data.items);
        setTotalVideosLoaded(data.items.length);
      } else {
        setApiData((prev) => [...prev, ...data.items]);
        setTotalVideosLoaded((prev) => prev + data.items.length);
      }

      // Store the next page token for the next fetch
      setPageToken(data.nextPageToken);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching recommended videos:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    // Initial fetch on component mount and categoryId change
    fetchData();
    // Reset state when categoryId changes
    return () => {
      setApiData([]);
      setTotalVideosLoaded(0);
      setPageToken("");
    };
  }, [categoryId]);

  // useEffect to handle infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.offsetHeight - 500 && // Load a bit earlier
        !loadingMore && // Do not load if already loading
        pageToken && // Make sure there is a next page token
        totalVideosLoaded < 100 // Ensure we haven't reached the total limit
      ) {
        fetchData(pageToken);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, pageToken, totalVideosLoaded]);

  if (loading) return <div className="p-4 w-full md:w-[380px]">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500 w-full md:w-[380px]">Error: {error}</div>
    );
  if (!apiData?.length)
    return <div className="p-4 w-full md:w-[380px]">No videos found</div>;

  return (
    <div className="p-4 w-full md:w-[380px]">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={item.id || index}
          className="flex gap-3 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
            className="w-44 h-24 rounded-md object-cover"
          />
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="text-sm font-semibold leading-snug text-gray-800 line-clamp-2">
              {item.snippet.title}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              {item.snippet.channelTitle}
            </p>
            <p className="text-xs text-gray-500 mt-auto">
              {valueConverter(item.statistics.viewCount)} views •{" "}
              {valueConverter(item.statistics.likeCount)} likes
            </p>
          </div>
        </Link>
      ))}
      {loadingMore && (
        <div className="p-4 text-center text-gray-500">Loading more...</div>
      )}
      {!pageToken && totalVideosLoaded >= 20 && (
        <div className="p-4 text-center text-gray-500">End of videos.</div>
      )}
    </div>
  );
};

export default Recommended;
