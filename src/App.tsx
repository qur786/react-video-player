import { VIDEOS } from "./data";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoPlaylist } from "./components/VideoPlaylist";
import { useRef, useState } from "react";

export function App(): JSX.Element {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handleVideoItemClick = (index: number) => {
    setCurrentVideoIndex(index);
    if (window.matchMedia("(max-width: 768px)").matches) {
      videoContainerRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4 py-4 box-border">
      <h2 className="text-center text-2xl text-sky-500 font-bold">
        React Video Player
      </h2>
      <div className="w-full flex flex-col md:gap-4 md:flex-row box-border px-4">
        <div
          className="w-full md:w-3/5 md:h-[90%] box-border"
          ref={videoContainerRef}
        >
          <VideoPlayer {...VIDEOS[currentVideoIndex]} />
        </div>
        <div className="flex flex-col gap-4 items-center md:h-[75vh] overflow-y-auto scroll-smooth custom-scroll">
          <VideoPlaylist videos={VIDEOS} onClick={handleVideoItemClick} />
        </div>
      </div>
    </div>
  );
}
