import { VideoPlayer } from "./components/VideoPlayer";

export function App(): JSX.Element {
  return (
    <VideoPlayer sources="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
  );
}
