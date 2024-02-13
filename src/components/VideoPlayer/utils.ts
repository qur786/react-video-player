/**
 * Dictionary containing record of extension to video MIME type data.
 */
const VideoExtensionToMIMEDictionary = {
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "video/ogg",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  avi: "video/x-msvideo",
  mov: "video/quicktime",
  mkv: "video/x-matroska",
  asf: "video/x-ms-asf",
  flv: "video/x-flv",
  wmv: "video/x-ms-wmv",
  vob: "video/x-ms-vob",
  rv: "video/vnd.rn-realvideo",
  ogv: "video/ogg",
} as const;

/**
 * Function to get the extension of a URL.
 */
function getURLExtension(url: string): string {
  try {
    const { pathname } = new URL(url);
    const pathnameParts = pathname.split(".");
    const extension = pathnameParts[pathnameParts.length - 1];
    return extension;
  } catch {
    throw new Error("Invalid URL.");
  }
}

/**
 * Function to get the video mime type from its URL.
 */
export function getVideoMIMETypeFromURL(url: string): string | undefined {
  const extension = getURLExtension(url);
  const mimeType =
    VideoExtensionToMIMEDictionary[
      extension as keyof typeof VideoExtensionToMIMEDictionary
    ];
  return mimeType;
}
