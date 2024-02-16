import type { ChangeEventHandler } from "react";
import { VideoItem } from "../VideoItem";
import { type Dispatch, type SetStateAction, useState } from "react";
import { List, arrayMove } from "react-movable";

/**
 * Props for VideoPlaylist component.
 */
interface VideoPlaylistProps {
  /**
   * Videos data.
   */
  videos: VideoItem[];
  /**
   * Function to update videos. Used for updating the ordering of the videos in the original lsit.
   */
  updateVideos: Dispatch<SetStateAction<VideoItem[]>>;
  /**
   * Click event handler for playlist individual video.
   */
  onClick?: (index: number) => void;
}

/**
 * React component to render video playlist.
 */
export function VideoPlaylist({
  videos,
  updateVideos,
  onClick,
}: VideoPlaylistProps): JSX.Element {
  const [search, setSearch] = useState(""); // For search string

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 md:w-96 w-[90vw] box-border md:items-center md:h-[75vh]">
      <input
        id="video-search"
        type="search"
        placeholder="Search video by title"
        value={search}
        onChange={handleSearchChange}
        className="border w-[80%] self-center box-border px-2 py-1 rounded-md border-black"
      />
      <List
        values={
          search.length > 0
            ? videos.map((ele) => ({ ...ele, disabled: true })) // To disable moveability on search
            : videos
        }
        onChange={({ oldIndex, newIndex }) => {
          updateVideos(arrayMove(videos, oldIndex, newIndex)); // To update original video index on move
        }}
        renderList={({ children, props }) => (
          <ul className="overflow-y-auto custom-scroll" {...props}>
            {children}
          </ul>
        )}
        renderItem={({
          value: { title, thumbnail, description, sources },
          props,
          index,
        }) => {
          return (
            <li
              className="py-2 list-none"
              hidden={
                search.length > 0 &&
                !title.toLowerCase().startsWith(search.toLowerCase())
              } // To hide video items which does not start with the search string
              {...props}
              key={title}
            >
              <VideoItem
                thumbnail={thumbnail}
                title={title}
                description={description}
                sources={sources}
                index={index ?? 0}
                onClick={onClick}
                moveDisabled={search.length > 0}
              />
            </li>
          );
        }}
      />
    </div>
  );
}
