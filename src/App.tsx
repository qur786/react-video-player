import { VIDEOS } from "./data";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoPlaylist } from "./components/VideoPlaylist";

export function App(): JSX.Element {
  return (
    <div className="h-screen flex flex-col gap-4 py-4 box-border">
      <h2 className="text-center text-2xl text-sky-500 font-bold">
        React Video Player
      </h2>
      <div className="w-full flex flex-col md:flex-row gap-4 box-border px-4">
        <div className="w-full md:w-3/5 h-[90%] box-border">
          <VideoPlayer
            sources={[
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            ]}
          />
        </div>
        <div className="flex flex-col gap-4 md:h-[75vh] overflow-y-auto scroll-smooth custom-scroll">
          <VideoPlaylist videos={VIDEOS} />
        </div>
      </div>
    </div>
  );
}
