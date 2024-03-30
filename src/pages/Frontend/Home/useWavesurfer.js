// useWavesurfer.js

import { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const useWavesurfer = (containerRef, options) => {
    const [wavesurfer, setWavesurfer] = useState(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
        });

        setWavesurfer(ws);

        return () => {
            if (wavesurfer) wavesurfer.destroy();
        };
    }, []); // Empty dependency array to run useEffect only once when component mounts

    return wavesurfer;
};

export default useWavesurfer;
