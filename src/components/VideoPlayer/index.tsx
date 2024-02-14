import type { VideoItem } from "../VideoItem";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/16/solid";
import { formatTime, getVideoMIMETypeFromURL } from "./utils";
import { useEffect, useRef, useState } from "react";

/**
 * Props for VideoPlayer component.
 */
type VideoPlayerProps = VideoItem;

/**
 * React component to play video.
 */
export function VideoPlayer({
  sources,
  thumbnail,
  title,
}: VideoPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playBackSpeed, setPlayBackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPauseClick: MouseEventHandler<HTMLElement> = () => {
    if (videoRef.current !== null) {
      if (!isPlaying) {
        videoRef.current.play().catch(console.log);
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleProgressChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const value = Number.parseFloat(event.target.value);
    if (Number.isFinite(value)) {
      setCurrentTime(value);
      if (videoRef.current !== null) {
        videoRef.current.currentTime = value;
      }
    }
  };

  const handlePlayBackRateChange: ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    const value = Number.parseFloat(e.currentTarget.value);
    if (Number.isFinite(value)) {
      setPlayBackSpeed(value);
      if (videoRef.current !== null) {
        videoRef.current.playbackRate = value;
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

    const timeUpdateEventListener = () => {
      setCurrentTime(video?.currentTime ?? 0);
    };

    const metaDataLoadEventListener = () => {
      setDuration(video?.duration ?? 0);
      setIsPlaying(false);
    };

    if (video !== null) {
      video.addEventListener("playing", playingEventListener);

      video.addEventListener("pause", pauseEventListener);

      video.addEventListener("timeupdate", timeUpdateEventListener);

      video.addEventListener("loadedmetadata", metaDataLoadEventListener);

      video.addEventListener("canplaythrough", () => {
        setLoading(false);
      });
    }

    return () => {
      video?.removeEventListener("playing", playingEventListener);
      video?.removeEventListener("pause", pauseEventListener);
      video?.removeEventListener("timeupdate", timeUpdateEventListener);
      video?.removeEventListener("loadedmetadata", metaDataLoadEventListener);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    videoRef.current?.load();
  }, [sources]); // To reload video element when sources changes

  return (
    <div
      className="w-full h-full flex flex-col items-center box-border cursor-pointer"
      onClick={handlePlayPauseClick}
    >
      <div className="md:h-[75vh] h-[90vh] w-3/4 md:w-full relative">
        {loading ? (
          <div
            id="overlay"
            className="z-10 h-full w-full rounded-lg absolute flex flex-col items-center justify-center bg-black"
          >
            <span className="custom-loader"></span>
          </div>
        ) : undefined}
        <video
          className="w-full h-full rounded-xl object-top bg-black video-thumbnail"
          poster={thumbnail}
          ref={videoRef}
          autoPlay
        >
          {sources.map((src) => (
            <source key={src} src={src} type={getVideoMIMETypeFromURL(src)} />
          ))}
          <p>Your browser does not support video.</p>
        </video>
      </div>
      <div className="flex flex-col w-3/4 md:w-full relative -top-12 px-2 gap-2 z-20">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <div className="flex flex-row">
          <button onClick={handlePlayPauseClick}>
            {isPlaying ? (
              <PauseIcon className="h-6 text-white" title="Pause" />
            ) : (
              <PlayIcon className="h-6 text-white" title="Play" />
            )}
          </button>
          <p className="text-white">{`${formatTime(currentTime)}/${formatTime(duration)}`}</p>
          <select
            id="playback-speed"
            title="Playback Speed"
            className="appearance-none px-4 hover:cursor-pointer bg-transparent text-white focus:outline-none justify-self-end"
            value={playBackSpeed}
            onChange={handlePlayBackRateChange}
          >
            <option value={0.25} className="text-black">
              0.25x
            </option>
            <option value={0.5} className="text-black">
              0.5x
            </option>
            <option value={0.75} className="text-black">
              0.75x
            </option>
            <option value={1} className="text-black">
              1x
            </option>
            <option value={1.25} className="text-black">
              1.25x
            </option>
            <option value={1.5} className="text-black">
              1.5x
            </option>
            <option value={1.75} className="text-black">
              1.75x
            </option>
            <option value={2} className="text-black">
              2x
            </option>
          </select>
        </div>
        <h6 className="text-xl font-bold text-center py-4 px-2 text-sky-500">
          {title}
        </h6>
      </div>
    </div>
  );
}
