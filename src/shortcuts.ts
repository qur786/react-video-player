function pauseAndPlayShortcut(videoElement: HTMLVideoElement): void {
  if (videoElement.paused || videoElement.ended) {
    videoElement.play().catch(console.log);
  } else {
    videoElement.pause();
  }
}

function volumeIncreaseShortcut(videoElement: HTMLVideoElement): void {
  videoElement.volume = Math.min(videoElement.volume + 0.1, 1);
}

function volumeDecreaseShortcut(videoElement: HTMLVideoElement): void {
  videoElement.volume = Math.max(videoElement.volume - 0.1, 0);
}

function speedIncreaseShortcut(videoElement: HTMLVideoElement): void {
  videoElement.playbackRate = Math.min(videoElement.playbackRate + 0.25, 2);
}

function speedDecreaseShortcut(videoElement: HTMLVideoElement): void {
  videoElement.playbackRate = Math.max(videoElement.playbackRate - 0.25, 0.25);
}

function speedNormalShortcut(videoElement: HTMLVideoElement): void {
  videoElement.playbackRate = 1;
}

function videoJumAheadShortcut(videoElement: HTMLVideoElement): void {
  videoElement.currentTime = Math.min(
    videoElement.currentTime + 10,
    videoElement.duration,
  );
}

function videoJumBehindShortcut(videoElement: HTMLVideoElement): void {
  videoElement.currentTime = Math.max(videoElement.currentTime - 10, 0);
}

function startVideoFromScratchShortcut(videoElement: HTMLVideoElement): void {
  videoElement.currentTime = 0;
}

function fullScreenShortcut(videoElement: HTMLVideoElement): void {
  videoElement.requestFullscreen().catch(console.log);
}

export const ShortcutHandlerDictionary = {
  Space: pauseAndPlayShortcut,
  V: volumeIncreaseShortcut,
  v: volumeDecreaseShortcut,
  S: speedIncreaseShortcut,
  s: speedDecreaseShortcut,
  n: speedNormalShortcut,
  ArrowRight: videoJumAheadShortcut,
  ArrowLeft: videoJumBehindShortcut,
  f: fullScreenShortcut,
  0: startVideoFromScratchShortcut,
} as const;

export const ShortcutDescription: Record<
  keyof typeof ShortcutHandlerDictionary,
  string
> = {
  Space: "Press space bar to pause and play current video.",
  V: "Press V to increase volume by 10%.",
  v: "Press s to decrease volume by 10%.",
  S: "Press S to increase speed by 0.25x.",
  s: "Press s to decrease speed by 0.25x.",
  n: "Press n to make current video speed normal.",
  ArrowRight:
    "Press Arrow Right i.e. > to make current video jump ahead by 10 seconds.",
  ArrowLeft:
    "Press Arrow Left i.e. < to make current video jump behind by 10 seconds.",
  f: "Press f to view video in full screen mode.",
  0: "Press 0 to re-start the current video again.",
} as const;
