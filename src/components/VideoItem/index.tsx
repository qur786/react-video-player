export interface VideoItemProps {
  thumbnail: string;
  title: string;
  description: string;
}

export function VideoItem({
  thumbnail,
  title,
  description,
}: VideoItemProps): JSX.Element {
  return (
    <div className="flex flex-row flex-shrink-0 gap-2 h-36 overflow-clip hover:cursor-pointer group snap-start">
      <img
        src={thumbnail}
        className="w-48 rounded-lg object-cover group-hover:grayscale-[80%]"
      />
      <div className="flex flex-col w-48 group">
        <h6 className="text-lg font-bold">{title}</h6>
        <p className="text-sm opacity-60">{description.split(".")[0]}</p>
      </div>
    </div>
  );
}
