import type { ChangeEventHandler, MouseEventHandler } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { formatTime, getVideoMIMETypeFromURL } from "./utils";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playBackSpeed, setPlayBackSpeed] = useState(1);
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
    };

    if (video !== null) {
      video.addEventListener("playing", playingEventListener);

      video.addEventListener("pause", pauseEventListener);

      video.addEventListener("timeupdate", timeUpdateEventListener);

      video.addEventListener("loadedmetadata", metaDataLoadEventListener);
    }

    return () => {
      video?.removeEventListener("playing", playingEventListener);
      video?.removeEventListener("pause", pauseEventListener);
      video?.removeEventListener("timeupdate", timeUpdateEventListener);
      video?.removeEventListener("loadedmetadata", metaDataLoadEventListener);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <video
        controls
        controlsList="noplay nopause"
        className="h-full w-full rounded-sm"
        ref={videoRef}
      >
        {(Array.isArray(sources) ? sources : [sources]).map((src) => (
          <source key={src} src={src} type={getVideoMIMETypeFromURL(src)} />
        ))}
        <p>Your browser does not support video.</p>
      </video>
      <div className="flex flex-row">
        <button onClick={handlePlayPauseClick}>
          {isPlaying ? (
            <PauseIcon className="h-4 text-black" />
          ) : (
            <PlayIcon className="h-4 text-black" />
          )}
        </button>
        <p>{`${formatTime(currentTime)}/${formatTime(duration)}`}</p>
        <select
          id="playback-speed"
          title="Playback Speed"
          className="appearance-none px-4"
          value={playBackSpeed}
          onChange={handlePlayBackRateChange}
        >
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
          <option value={1.75}>1.75x</option>
          <option value={2}>2x</option>
        </select>
      </div>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleProgressChange}
      />
    </div>
  );
}
