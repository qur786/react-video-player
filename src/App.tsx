import { VIDEOS } from "./data";
import type { VideoItem } from "./components/VideoItem";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoPlaylist } from "./components/VideoPlaylist";
import { useCallback, useRef, useState } from "react";

export function App(): JSX.Element {
  const [videos, setVideos] = useState<VideoItem[]>(VIDEOS); // The original videos.
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(
    VIDEOS[VIDEOS.length - 1],
  ); // The selected video to play currently.
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for the video element.

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
    }); // When the new video is requested to be played by clicking on the playlist video, it stores the last timing of the last video. So that it can play it from that time when it is played again.

    setSelectedVideo(videos[index]); // Selected video

    if (window.matchMedia("(max-width: 768px)").matches) {
      videoRef.current?.scrollIntoView({
        behavior: "smooth",
      }); // In mobile view, scrolls to the top when a video is clicked from the video playlist. So that user will not have to scroll to screen when he/she chooses a video.
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
  }, []); // An event handler to handle video end. It play the first video and rotate it (put the first video in the last), so that when the first video ends, it can play the next video.

  return (
    <div className="h-screen flex flex-col gap-4 py-4 box-border">
      <h2 className="text-center text-2xl text-sky-500 font-bold">
        React Video Player
      </h2>
      <div className="w-full flex flex-col md:gap-4 md:flex-row box-border px-4">
        <VideoPlayer
          {...selectedVideo}
          ref={videoRef}
          onVideoEnd={handleVideoEnd}
        />
        <VideoPlaylist
          videos={videos}
          updateVideos={setVideos}
          onClick={handleVideoItemClick}
        />
      </div>
    </div>
  );
}
