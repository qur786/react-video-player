import { VIDEOS } from "./data";
import type { VideoItem } from "./components/VideoItem";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoPlaylist } from "./components/VideoPlaylist";
import { useCallback, useRef, useState } from "react";

export function App(): JSX.Element {
  const [videos, setVideos] = useState<VideoItem[]>(VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(
    VIDEOS[VIDEOS.length - 1],
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoItemClick = (index: number) => {
    setVideos((prev) => {
      const newVideos = [...prev];
      const currentVideoIndex = newVideos.findIndex(
        (ele) =>
          videoRef.current?.title === ele.title &&
          ele.sources.includes(videoRef.current.currentSrc),
      );
      newVideos[currentVideoIndex].initialTime =
        videoRef.current?.currentTime ?? 0;
      return newVideos;
    });

    setSelectedVideo(videos[index]);

    if (window.matchMedia("(max-width: 768px)").matches) {
      videoRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleVideoEnd = useCallback(() => {
    setVideos((prev) => {
      setSelectedVideo(prev[0]);
      const firstVideo = prev[0];
      const newVideos = [...prev.slice(1)];
      const output = [...newVideos, firstVideo];
      return output;
    });
  }, []);

  return (
    <div className="h-screen flex flex-col gap-4 py-4 box-border">
      <h2 className="text-center text-2xl text-sky-500 font-bold">
        React Video Player
      </h2>
      <div className="w-full flex flex-col md:gap-4 md:flex-row box-border px-4">
        <div className="w-full md:w-3/5 md:h-[90%] box-border">
          <VideoPlayer
            {...selectedVideo}
            ref={videoRef}
            onVideoEnd={handleVideoEnd}
          />
        </div>
        <div className="flex flex-col gap-4 md:items-center md:h-[75vh] overflow-y-auto scroll-smooth custom-scroll">
          <VideoPlaylist
            videos={videos}
            setVideos={setVideos}
            onClick={handleVideoItemClick}
          />
        </div>
      </div>
    </div>
  );
}
