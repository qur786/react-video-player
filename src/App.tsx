import { VideoPlayer } from "./components/VideoPlayer";

export function App(): JSX.Element {
  return (
    <div className="h-full flex flex-col gap-4 py-4">
      <h2 className="text-center text-2xl text-sky-500 font-bold">
        React Video Player
      </h2>
      <div className="w-full flex flex-col md:flex-row gap-4 p-2">
        <div className="w-full md:w-3/5 h-3/5 box-border">
          <VideoPlayer sources="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>
        <div>Video list</div>
      </div>
    </div>
  );
}
