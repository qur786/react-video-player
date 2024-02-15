import { VideoItem } from "../VideoItem";
import type { Dispatch, SetStateAction } from "react";
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
  return (
    <>
      <List
        values={videos}
        onChange={({ oldIndex, newIndex }) => {
          setVideos(arrayMove(videos, oldIndex, newIndex));
        }}
        renderList={({ children, props }) => (
          <ul className="overflow-y-scroll" {...props}>
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
              />
            </li>
          );
        }}
      />
      {/* {videos.map(({ thumbnail, title, description, sources }, index) => (
        <VideoItem
          key={title}
          thumbnail={thumbnail}
          title={title}
          description={description}
          sources={sources}
          index={index}
          onClick={onClick}
        />
      ))} */}
    </>
  );
}
