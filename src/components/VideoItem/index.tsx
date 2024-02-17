import type { MouseEventHandler } from "react";
import { PlayIcon } from "@heroicons/react/16/solid";

/**
 * Props for individual video.
 */
export interface VideoItem {
  /**
   * Thumbnail url of the video.
   */
  thumbnail: string;
  /**
   * Title of the video.
   */
  title: string;
  /**
   * Description of the video.
   */
  description: string;
  /**
   * set of URLs of the video.
   */
  sources: string[];
  /**
   * Subtitle for the video.
   */
  subtitle?: string;
  /**
   * Initial time where the video should start.
   */
  initialTime?: number;
}

/**
 * Props for the VideoItem component.
 */
export interface VideoItemProps extends VideoItem {
  /**
   * Click handler for the play list item.
   */
  onClick?: (index: number) => void;
  /**
   * Index of the video item.
   */
  index: number;
  /**
   * If move is disabled or not.
   */
  moveDisabled?: boolean;
}

/**
 * The component for individual video in the VideoPlaylist.
 */
export function VideoItem({
  thumbnail,
  title,
  description,
  index,
  onClick,
  moveDisabled,
}: VideoItemProps): JSX.Element {
  const handleClick: MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();
    onClick?.(
      Number.parseInt(e.currentTarget.getAttribute("data-index") ?? ""),
    );
  };
  return (
    <div className="flex flex-row flex-shrink-0 gap-4 h-36 overflow-clip hover:cursor-pointer snap-start">
      <div className="relative" onClick={handleClick} data-index={index}>
        <img
          src={thumbnail}
          className="md:w-48 w-screen h-full rounded-lg object-cover peer hover:grayscale-[80%] border"
        />
        <PlayIcon className="h-8 z-10 peer-hover:scale-150 hover:scale-150 peer transition-transform text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* To make any entity movable by some interactive element, then we need to use data-movable-handle as per react-movable package. Ref: https://github.com/tajo/react-movable/blob/0df486a69ec122ea18229b85e0d60dc5f6091612/examples/Handle.tsx#L101 */}
      <div
        className={`flex flex-col md:w-48 w-screen ${moveDisabled ? "cursor-no-drop" : "cursor-move"}`} // To show disabled icon for move when the user is searching
        data-movable-handle
      >
        <h6 className="text-lg font-bold">{title}</h6>
        <p className="text-sm opacity-60">
          {description.split(" ").slice(0, 10).join(" ")}
        </p>
      </div>
    </div>
  );
}
