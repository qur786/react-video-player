import { getVideoMIMETypeFromURL } from "./utils";

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
  return (
    <video controls className="h-full w-full rounded-sm">
      {(Array.isArray(sources) ? sources : [sources]).map((src) => (
        <source key={src} src={src} type={getVideoMIMETypeFromURL(src)} />
      ))}
      <p>Your browser does not support video.</p>
    </video>
  );
}
