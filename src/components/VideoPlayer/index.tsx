/* eslint-disable @typescript-eslint/no-empty-function */
import type { VideoItem } from "../VideoItem";
import {
  ArrowsPointingOutIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/16/solid";
import type { ChangeEventHandler, MouseEventHandler } from "react";
import { formatTime, getVideoMIMETypeFromURL } from "./utils";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/**
 * Props for VideoPlayer component.
 */
interface VideoPlayerProps extends VideoItem {
  /**
   * Event handler for video end event.
   */
  onVideoEnd?: (videoElement: HTMLVideoElement) => void;
}

/**
 * React component to play video.
 */
export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  function VideoPlayerComponent(
    { sources, thumbnail, title, onVideoEnd, initialTime },
    ref,
  ): JSX.Element {
    const [isPlaying, setIsPlaying] = useState(false); // To store the state if the video is playing or not.
    const [loading, setLoading] = useState(false); // To show loading overlay when video is loading
    const [currentTime, setCurrentTime] = useState(initialTime ?? 0);
    const [duration, setDuration] = useState(0);
    const [playBackSpeed, setPlayBackSpeed] = useState(1);
    const [volume, setVolume] = useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => videoRef.current!, []);

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

    const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      const value = Number.parseFloat(event.target.value);
      if (Number.isFinite(value)) {
        setVolume(value);
        if (videoRef.current !== null) {
          videoRef.current.volume = value;
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

    const handleFullScreenClick: MouseEventHandler<HTMLButtonElement> = () => {
      if (videoRef.current !== null) {
        videoRef.current
          .requestFullscreen({ navigationUI: "hide" })
          .catch(console.log);
      }
    };

    useEffect(() => {
      const video = videoRef.current;

      let playingEventListener = () => {};
      let pauseEventListener = () => {};
      let timeUpdateEventListener = () => {};
      let metaDataLoadEventListener = () => {};
      let canPlayEventListener = () => {};
      let endEventListener = () => {};
      let playbackRateChangeEventListener = () => {};

      if (video !== null) {
        playingEventListener = () => {
          setIsPlaying(true);
        };

        pauseEventListener = () => {
          setIsPlaying(false);
        };

        timeUpdateEventListener = () => {
          setCurrentTime(video.currentTime);
        };

        metaDataLoadEventListener = () => {
          setDuration(video.duration);
          setIsPlaying(false);
        };

        canPlayEventListener = () => {
          setLoading(false);
        };

        endEventListener = () => {
          onVideoEnd?.(video);
        };

        playbackRateChangeEventListener = () => {
          setPlayBackSpeed(video.playbackRate);
        };

        video.addEventListener("playing", playingEventListener);

        video.addEventListener("pause", pauseEventListener);

        video.addEventListener("timeupdate", timeUpdateEventListener);

        video.addEventListener("loadedmetadata", metaDataLoadEventListener);

        video.addEventListener("canplaythrough", canPlayEventListener);

        video.addEventListener("ended", endEventListener);

        video.addEventListener("ratechange", playbackRateChangeEventListener);
      }

      return () => {
        video?.removeEventListener("playing", playingEventListener);
        video?.removeEventListener("pause", pauseEventListener);
        video?.removeEventListener("timeupdate", timeUpdateEventListener);
        video?.removeEventListener("loadedmetadata", metaDataLoadEventListener);
        video?.removeEventListener("canplaythrough", canPlayEventListener);
        video?.removeEventListener("ended", endEventListener);
        video?.removeEventListener(
          "ratechange",
          playbackRateChangeEventListener,
        );
      };
    }, [onVideoEnd]);

    useEffect(() => {
      setLoading(true);
      setCurrentTime(initialTime ?? 0);
      videoRef.current?.load();
      if (videoRef.current !== null) {
        videoRef.current.currentTime = initialTime ?? 0;
      }
    }, [initialTime, sources]); // To reload video element when sources changes otherwise video won't change

    useEffect(() => {
      if (videoRef.current !== null) {
        setVolume(videoRef.current.volume);
      }
    }, []); // To store the volume in the state variable for the first time when the video is loaded.

    return (
      <div className="w-full md:w-3/5 md:h-[90%] flex flex-col items-center box-border">
        <div className="md:h-[75vh] h-[50vh] w-full md:w-full relative">
          {loading ? (
            <div
              id="overlay"
              className="z-10 h-full w-full rounded-lg absolute flex flex-col items-center justify-center bg-black"
            >
              <span className="custom-loader"></span>
            </div>
          ) : undefined}
          <video
            className="w-full h-full rounded-xl object-center bg-black video-thumbnail cursor-pointer"
            poster={thumbnail}
            ref={videoRef}
            onClick={handlePlayPauseClick}
            title={title}
            autoPlay
          >
            {sources.map((src) => (
              <source key={src} src={src} type={getVideoMIMETypeFromURL(src)} />
            ))}
            <p>Your browser does not support video.</p>
          </video>
        </div>
        <div className="flex flex-col w-full relative -top-12 px-2 gap-2 z-20 flex-nowrap">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <button onClick={handlePlayPauseClick}>
                {isPlaying ? (
                  <PauseIcon className="h-6 text-white" title="Pause" />
                ) : (
                  <PlayIcon className="h-6 text-white" title="Play" />
                )}
              </button>
              <p className="text-white">{`${formatTime(currentTime)}/${formatTime(duration)}`}</p>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row-reverse group gap-2 items-center px-2">
                <button className="peer group">
                  {volume === 0 ? (
                    <SpeakerXMarkIcon className="h-6 text-white" />
                  ) : (
                    <SpeakerWaveIcon className="h-6 text-white" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onClick={(e) => {
                    e.stopPropagation();
                  }} // To prevent clicking of parent div
                  onChange={handleVolumeChange}
                  className="progress-bar hidden w-full group-hover:block group-hover:animate-increase-width"
                />
              </div>
              <select
                id="playback-speed"
                title="Playback Speed"
                className="appearance-none md:px-2 hover:cursor-pointer bg-transparent text-white focus:outline-none justify-self-end"
                value={playBackSpeed}
                onChange={handlePlayBackRateChange}
                onClick={(e) => {
                  e.stopPropagation();
                }} // To prevent clicking of parent div
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
              <button onClick={handleFullScreenClick}>
                <ArrowsPointingOutIcon className="h-6 text-white" />
              </button>
            </div>
          </div>
          <h6 className="text-xl font-bold text-center py-4 px-2 text-sky-500">
            {title}
          </h6>
        </div>
      </div>
    );
  },
);
