import type { MouseEventHandler } from "react";
import { PlayIcon } from "@heroicons/react/16/solid";

export interface VideoItem {
  thumbnail: string;
  title: string;
  description: string;
  sources: string[];
}

export interface VideoItemProps extends VideoItem {
  onClick?: (index: number) => void;
  index: number;
}

export function VideoItem({
  thumbnail,
  title,
  description,
  index,
  onClick,
}: VideoItemProps): JSX.Element {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    onClick?.(
      Number.parseInt(e.currentTarget.getAttribute("data-index") ?? ""),
    );
  };
  return (
    <div
      data-index={index}
      onClick={handleClick}
      className="flex flex-row flex-shrink-0 relative gap-4 h-36 overflow-clip hover:cursor-pointer group snap-start"
    >
      <PlayIcon className="h-8 z-10 group-hover:scale-150 transition-transform text-white absolute top-1/2 left-1/4 -translate-x-1/4 -translate-y-1/2" />
      <img
        src={thumbnail}
        className="w-48 rounded-lg object-cover group-hover:grayscale-[80%]"
      />
      <div className="flex flex-col w-48 group">
        <h6 className="text-lg font-bold">{title}</h6>
        <p className="text-sm opacity-60">
          {description.split(" ").slice(0, 10).join(" ")}
        </p>
      </div>
    </div>
  );
}
