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
          <VideoPlayer sources="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        </div>
        <div className="flex flex-col gap-4 md:h-[75vh] overflow-y-auto scroll-smooth custom-scroll">
          <VideoPlaylist
            videos={[
              {
                thumbnail:
                  "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
                title: "Planet of the apes",
                description:
                  "Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference. Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference.",
              },
              {
                thumbnail:
                  "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
                title: "Planet of the apes",
                description:
                  "Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference. Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference.",
              },
              {
                thumbnail:
                  "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
                title: "Planet of the apes",
                description:
                  "Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference. Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference.",
              },
              {
                thumbnail:
                  "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
                title: "Planet of the apes",
                description:
                  "Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference. Player component is preferred when built in house. If you're facing any issue, feel free to use external libraries for player based on your preference.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
