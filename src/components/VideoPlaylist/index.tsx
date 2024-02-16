import type { ChangeEventHandler } from "react";
import { VideoItem } from "../VideoItem";
import { type Dispatch, type SetStateAction, useState } from "react";
import { List, arrayMove } from "react-movable";

interface VideoPlaylistProps {
  videos: VideoItem[];
  setVideos: Dispatch<SetStateAction<VideoItem[]>>;
  onClick?: (index: number) => void;
}

export function VideoPlaylist({
  videos,
  setVideos,
  onClick,
}: VideoPlaylistProps): JSX.Element {
  const [currentVideos, setCurrentVideos] = useState(videos);
  const [search, setSearch] = useState(""); // For search string

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
    const fileteredVideos = videos.filter((ele) =>
      ele.title.toLocaleLowerCase().startsWith(e.target.value.toLowerCase()),
    ); // Filtering videos from original video list and then setting it to the current video list to show users searched videos
    setCurrentVideos(fileteredVideos);
  };

  return (
    <div className="flex flex-col gap-2 md:w-96 w-screen">
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
            ? currentVideos.map((ele) => ({ ...ele, disabled: true }))
            : currentVideos // To disable moveability on search
        }
        onChange={({ oldIndex, newIndex }) => {
          setVideos(arrayMove(currentVideos, oldIndex, newIndex)); // To update original video index on move
        }}
        renderList={({ children, props }) => (
          <ul className="overflow-y-auto" {...props}>
            {children}
          </ul>
        )}
        renderItem={({
          value: { title, thumbnail, description, sources },
          props,
          index,
        }) => {
          return (
            <li className="py-2 list-none" {...props} key={title}>
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
