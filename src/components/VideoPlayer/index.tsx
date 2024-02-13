import type { MouseEventHandler } from "react";
import { getVideoMIMETypeFromURL } from "./utils";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

/**
 * Props for VideoPlayer component.
 */
interface VideoPlayerProps {
  /**
   * Source link for the video(s).
   */
  sources: string | string[];
}

/**
 * React component to play video.
 */
export function VideoPlayer({ sources }: VideoPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPauseClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (videoRef.current !== null) {
      if (!isPlaying) {
        videoRef.current.play().catch(console.log);
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const playingEventListener = () => {
      setIsPlaying(true);
    };

    const pauseEventListener = () => {
      setIsPlaying(false);
    };

    if (video !== null) {
      video.addEventListener("playing", playingEventListener);

      video.addEventListener("pause", pauseEventListener);
    }

    return () => {
      video?.removeEventListener("playing", playingEventListener);
      video?.removeEventListener("pause", pauseEventListener);
    };
  }, []);
  return (
    <div className="w-full h-full">
      <video controls className="h-full w-full rounded-sm" ref={videoRef}>
        {(Array.isArray(sources) ? sources : [sources]).map((src) => (
          <source key={src} src={src} type={getVideoMIMETypeFromURL(src)} />
        ))}
        <p>Your browser does not support video.</p>
      </video>
      <button onClick={handlePlayPauseClick}>
        {isPlaying ? (
          <PauseIcon className="h-4 text-black" />
        ) : (
          <PlayIcon className="h-4 text-black" />
        )}
      </button>
    </div>
  );
}
