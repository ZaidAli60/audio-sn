// Playlist.js

// Playlist.js

import React from 'react';
import WaveSurferPlayer from './WaveSurferPlayer';

const Playlist = ({ musicList, setCurrentPlayer }) => {
    return musicList.map((music, index) => (
        <WaveSurferPlayer
            key={music.url}
            url={music.url}
            onPlay={setCurrentPlayer}
            onReady={index === 0 ? setCurrentPlayer : undefined}
        />
    ));
};

export default Playlist;

