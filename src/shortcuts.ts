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

function jumpAheadShortcut(videoElement: HTMLVideoElement): void {
  videoElement.currentTime = Math.min(
    videoElement.currentTime + 10,
    videoElement.duration,
  );
}

function jumpBehindShortcut(videoElement: HTMLVideoElement): void {
  videoElement.currentTime = Math.max(videoElement.currentTime - 10, 0);
}

function startFromScratchShortcut(videoElement: HTMLVideoElement): void {
  videoElement.currentTime = 0;
}

function fullScreenShortcut(videoElement: HTMLVideoElement): void {
  videoElement.requestFullscreen().catch(console.log);
}

export const ShortcutHandlerDictionary = {
  " ": pauseAndPlayShortcut,
  V: volumeIncreaseShortcut,
  v: volumeDecreaseShortcut,
  S: speedIncreaseShortcut,
  s: speedDecreaseShortcut,
  n: speedNormalShortcut,
  ArrowRight: jumpAheadShortcut,
  ArrowLeft: jumpBehindShortcut,
  f: fullScreenShortcut,
  "0": startFromScratchShortcut,
} as const;
