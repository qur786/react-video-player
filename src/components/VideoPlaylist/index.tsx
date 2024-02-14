import { VideoItem } from "../VideoItem";

interface VideoPlaylistProps {
  videos: VideoItem[];
  onClick?: (index: number) => void;
}

export function VideoPlaylist({
  videos,
  onClick,
}: VideoPlaylistProps): JSX.Element {
  return (
    <>
      {videos.map(({ thumbnail, title, description, sources }, index) => (
        <VideoItem
          key={title}
          thumbnail={thumbnail}
          title={title}
          description={description}
          sources={sources}
          index={index}
          onClick={onClick}
        />
      ))}
    </>
  );
}
