import { VideoItem } from "../VideoItem";
import type { VideoItemProps } from "../VideoItem";

interface VideoPlaylistProps {
  videos: VideoItemProps[];
}

export function VideoPlaylist({ videos }: VideoPlaylistProps): JSX.Element {
  return (
    <>
      {videos.map(({ thumbnail, title, description }) => (
        <VideoItem
          key={title}
          thumbnail={thumbnail}
          title={title}
          description={description}
        />
      ))}
    </>
  );
}
