import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import useWavesurfer from './useWavesurfer';

const WaveSurferPlayer = memo(({ url, onPlay, onReady }) => {
    const containerRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [formattedCurrentTime, setFormattedCurrentTime] = useState('0:00');
    const [formattedTotalDuration, setFormattedTotalDuration] = useState('0:00');
    const wavesurfer = useWavesurfer(containerRef, { url });
    console.log('currentTime', currentTime)
    console.log('totalDuration', totalDuration)

    const onPlayClick = useCallback(() => {
        wavesurfer.playPause();
    }, [wavesurfer]);

    useEffect(() => {
        if (!wavesurfer) return;

        const getPlayerParams = () => ({
            media: wavesurfer.getMediaElement(),
            peaks: wavesurfer.exportPeaks(),
        });

        const startTimer = () => {
            return setInterval(() => {
                const newTime = wavesurfer.getCurrentTime();
                setCurrentTime(newTime);
                setFormattedCurrentTime(formatTime(newTime));
            }, 1000);
        };

        const formatTime = (timeInSeconds) => {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = Math.floor(timeInSeconds % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        const subscriptions = [
            wavesurfer.on('ready', () => {
                const duration = wavesurfer.getDuration();
                setTotalDuration(duration);
                setFormattedTotalDuration(formatTime(duration));
                onReady && onReady(getPlayerParams());
                setIsPlaying(wavesurfer.isPlaying());
            }),
            wavesurfer.on('play', () => {
                onPlay && onPlay((prev) => {
                    const newParams = getPlayerParams();
                    if (!prev || prev.media !== newParams.media) {
                        if (prev) {
                            prev.media.pause();
                            prev.media.currentTime = 0;
                        }
                        return newParams;
                    }
                    return prev;
                });
                setIsPlaying(true);
                const timer = startTimer();
                return () => clearInterval(timer);
            }),
            wavesurfer.on('pause', () => {
                setIsPlaying(false);
            }),
        ];

        return () => {
            subscriptions.forEach((unsub) => unsub());
        };
    }, [wavesurfer, onPlay, onReady]);

    return (
        <div>
            <button onClick={onPlayClick}>{isPlaying ? '⏸️' : '▶️'}</button>
            <div ref={containerRef} style={{ minWidth: '200px' }} />
            <div>Current Time: {formattedCurrentTime}</div>
            <div>Total Duration: {formattedTotalDuration}</div>
        </div>
    );
});

export default WaveSurferPlayer;


