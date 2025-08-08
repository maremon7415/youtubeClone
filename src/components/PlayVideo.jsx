/* UPDATED PlayVideo Component for Better Mobile Responsiveness */

/* ✅ Updates made:
- Title and buttons stack better on small screens
- Spacing adjusted for mobile clarity
- No layout or feature change on large screens
*/

import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import { MdLibraryMusic } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { api_key, valueConverter } from "../data";
import toast from "react-hot-toast";

const PlayVideo = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [channelLogo, setChannelLogo] = useState(null);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleComments, setVisibleComments] = useState(5);
  const commentsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${api_key}`;
    const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&key=${api_key}`;

    try {
      const [videoRes, commentsRes] = await Promise.all([
        fetch(videoDetailsUrl),
        fetch(commentsUrl),
      ]);
      const videoData = await videoRes.json();
      const commentsData = await commentsRes.json();

      if (videoData.items && videoData.items.length > 0) {
        setVideoData(videoData.items[0]);
        const channelId = videoData.items[0].snippet.channelId;
        const channelRes = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${api_key}`
        );
        const channelData = await channelRes.json();
        if (channelData.items && channelData.items.length > 0) {
          setChannelLogo(channelData.items[0].snippet.thumbnails.default.url);
        }
      } else {
        setError("Video data not found.");
      }

      setComments(commentsData.items || []);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load video data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [videoId]);

  const handleShare = async () => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: videoData?.snippet?.title,
          url: videoUrl,
        });
      } else {
        await navigator.clipboard.writeText(videoUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
      toast.error("Failed to share");
    }
  };

  if (loading)
    return (
      <div className="p-4 w-full text-center text-gray-500">Loading...</div>
    );
  if (error)
    return <div className="p-4 w-full text-center text-red-500">{error}</div>;
  if (!videoData)
    return (
      <div className="p-4 w-full text-center text-gray-500">
        Video not found.
      </div>
    );

  const { snippet, statistics } = videoData;
  const description = snippet.description;

  const showMoreComments = () =>
    setVisibleComments((prev) => prev + commentsPerPage);
  const showLessComments = () => setVisibleComments(commentsPerPage);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white text-black min-h-screen">
      <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold mt-4 leading-snug">
        {snippet.title}
      </h2>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {channelLogo && (
            <img
              src={channelLogo}
              alt="Channel Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-medium">{snippet.channelTitle}</p>
            <p className="text-xs text-gray-500">
              {new Date(snippet.publishedAt).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2 w-full sm:w-auto text-sm">
          <div className="flex bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-full items-center gap-1 cursor-pointer">
            <AiOutlineLike className="text-xl" />
            {statistics.likeCount ? valueConverter(statistics.likeCount) : "0"}
            <div className="w-[1px] h-5 bg-gray-400 mx-2" />
            <AiOutlineDislike className="text-xl" />
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
          >
            <TbShare3 className="text-lg" /> Share
          </button>
          <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition">
            <MdLibraryMusic className="text-lg" /> Download
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
            <HiOutlineDotsHorizontal className="text-xl" />
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 p-4 bg-gray-100 rounded-lg">
        <p className="font-semibold text-gray-800">
          {valueConverter(statistics.viewCount)} views •{" "}
          {new Date(snippet.publishedAt).toLocaleDateString()}
        </p>
        <p
          className={`whitespace-pre-line mt-2 ${
            showMoreDescription ? "" : "line-clamp-3"
          }`}
        >
          {description}
        </p>
        {description && (
          <button
            onClick={() => setShowMoreDescription((prev) => !prev)}
            className="text-gray-500 mt-1 hover:underline outline-none font-semibold"
          >
            {showMoreDescription ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {statistics.commentCount
            ? `Comments (${valueConverter(statistics.commentCount)})`
            : "Comments"}
        </h3>

        {comments.slice(0, visibleComments).map((comment, index) => {
          const snippet = comment.snippet.topLevelComment.snippet;
          return (
            <div key={index} className="flex gap-3 mb-6">
              <img
                src={snippet.authorProfileImageUrl}
                alt={snippet.authorDisplayName}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {snippet.authorDisplayName}{" "}
                  <span className="text-xs text-gray-500">
                    • {new Date(snippet.publishedAt).toDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-700 mt-0.5 whitespace-pre-line">
                  {snippet.textDisplay}
                </p>
                <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                  <button className="flex items-center gap-1 hover:text-black transition">
                    <AiOutlineLike className="text-base" />
                    {snippet.likeCount > 0 && valueConverter(snippet.likeCount)}
                  </button>
                  <button className="flex items-center gap-1 hover:text-black transition">
                    <AiOutlineDislike className="text-base" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {comments.length > visibleComments ? (
          <button
            onClick={showMoreComments}
            className="w-full py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition font-semibold"
          >
            Show More Comments
          </button>
        ) : (
          comments.length > commentsPerPage && (
            <button
              onClick={showLessComments}
              className="w-full py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition font-semibold"
            >
              Show Less Comments
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
