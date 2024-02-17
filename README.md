# React Video Player App

**Live Demo:** [React Video Player](https://qur786.github.io/react-video-player/)

## Overview

This project is a React.js-based video player application developed for the React Video Player App assignment by Rigi. It allows users to play videos from a playlist with essential features like play/pause toggle, seeking, timer, autoplay, and speed selector. Additionally, users can reorder the playlist and enjoy additional features such as fullscreen mode and keyboard shortcuts.

## Running the Application Locally

### Requirements

To run this application, you will need:

- Git - [How to install Git?](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Node.js (v18 or higher) - [How to install Node.js?](https://nodejs.org/en/download)
- yarn - [How to install yarn?](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stables)
- Internet connection (for accessing video)
- Web browser (for accessing the application)

### To run the application locally, follow these steps:

1. Clone this repository to your local machine using:

```bash
git clone https://github.com/qur786/react-video-player.git
```

2. Navigate to the project directory:

```bash
cd react-video-player
```

3. Install dependencies:

```bash
yarn install
```

4. Start the development server:

```bash
yarn start
```

5. Open your browser and visit [http://localhost:3000/react-video-player/](http://localhost:3000/react-video-player/) to view the application.

## Features

1. **Video Player Component:**

- Implements a video player with essential functionalities such as play/pause toggle, seeking, timer, autoplay, and speed selector.

2. **Playlist Component:**

- Provides a playlist component to display and manage videos.
- Allows users to reorder videos in the playlist.
- Clicking on a video in the playlist loads and plays that video in the video player.

3. **React State Management:**

- Manages video playback, playlist state, and other necessary variables using React state/context.

4. **Styling:**

- Utilizes Tailwind CSS for styling, ensuring a clean and user-friendly interface.

5. **Additional Features:**

- Fullscreen mode with default browser controls.
- Keyboard shortcuts for ease of use.
- Shortcuts for user reference (Available shortcuts have been shown in a modal)

## Project Structure

react-video-player/
├── public/               # Public assets and index.html
├── src/                  # Source files
│   ├── components/       # React components
│   ├── App.tsx           # Main application component
│   ├── data.ts           # Video URLs data
│   ├── shortcuts.ts      # Utility functions for shortcuts
│   ├── index.css         # Entry CSS file
│   └── main.tsx          # Entry point
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation


## Additional Notes

- This project was completed within the given timeframe, adhering to most of the requirements specified in the assignment brief.
- External libraries were used sparingly, with most features built in-house to ensure code quality and optimization.
- Fullscreen mode utilizes default browser controls; custom controls are not implemented in fullscreen mode due to technical limitations.

## Available shortcuts

| Shortcuts | Description                                              |
| --------- | -------------------------------------------------------- |
| 0         | Press 0 to re-start the current video again.             |
| p         | Press p to pause and play current video.                 |
| V         | Press V to increase volume by 10%.                       |
| v         | Press v to decrease volume by 10%.                       |
| S         | Press S to increase speed by 0.25x.                      |
| s         | Press s to decrease speed by 0.25x.                      |
| n         | Press n to make current video speed normal.              |
| w         | Press w to make current video jump ahead by 10 seconds.  |
| q         | Press q to make current video jump behind by 10 seconds. |
| f         | Press f to view video in full screen mode.               |
