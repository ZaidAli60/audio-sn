import React from "react"
// import { useWavesurfer } from '@wavesurfer/react'
// import { useNavigate } from 'react-router-dom'; // Import useNavigate if using React Router
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';
import audio from "assets/music/audio.mp3"

const audioUrls = [
    'https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav',
    'https://res.cloudinary.com/dufkxmegs/video/upload/v1711742714/TTM1_z9vxca.wav',
    'https://res.cloudinary.com/dufkxmegs/video/upload/v1711706048/bkr8d4jjd6zzpd4edvjn.mp3',
    'https://res.cloudinary.com/dufkxmegs/video/upload/v1711744788/TTM_3_dfc6ya.wav',
]

// const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

export default function RenventingMusic() {
    // const containerRef = useRef(null)
    // const [urlIndex, setUrlIndex] = useState(0)
    // const [totalDuration, setTotalDuration] = useState(0)
    // const [currentTime, setCurrentTime] = useState(0)
    // const [isPlaying, setIsPlaying] = useState(false)

    // const { wavesurfer } = useWavesurfer({
    //     container: containerRef,
    //     height: 40,
    //     waveColor: "rgb(169,168,178)",
    //     progressColor: "rgb(58, 91, 201)",
    //     barWidth: "1",
    //     barGap: "1",
    //     barRadius: "1",
    //     url: audioUrls[urlIndex],
    // })

    // useEffect(() => {
    //     if (!wavesurfer) return;

    //     const onReadyCallback = () => {
    //         setTotalDuration(wavesurfer.getDuration());
    //         if (urlIndex !== 0) {
    //             wavesurfer.play();
    //             setIsPlaying(true);
    //         }
    //     };

    //     wavesurfer.on('ready', onReadyCallback);

    //     return () => {
    //         wavesurfer.un('ready', onReadyCallback);
    //     };
    // }, [wavesurfer, urlIndex]); // Re-run effect when wavesurfer or urlIndex changes

    // useEffect(() => {
    //     // Update current time every second
    //     const interval = setInterval(() => {
    //         if (wavesurfer && wavesurfer.isPlaying()) {
    //             setCurrentTime(wavesurfer.getCurrentTime());
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [wavesurfer]);

    // useEffect(() => {
    //     if (wavesurfer) {
    //         wavesurfer.on('finish', () => {
    //             setIsPlaying(false);
    //         });
    //     }
    //     return () => {
    //         wavesurfer && wavesurfer.un('finish');
    //     };
    // }, [wavesurfer]);

    // const onPrevious = useCallback(() => {
    //     if (wavesurfer) {
    //         wavesurfer.stop();
    //     }
    //     setUrlIndex((index) => (index - 1 + audioUrls.length) % audioUrls.length);
    //     setCurrentTime(0);
    // }, [wavesurfer])

    // const onNext = useCallback(() => {
    //     if (wavesurfer) {
    //         wavesurfer.stop();
    //     }
    //     setUrlIndex((index) => (index + 1) % audioUrls.length);
    //     setCurrentTime(0);
    // }, [wavesurfer])

    // const togglePlayPause = useCallback(() => {
    //     if (wavesurfer) {
    //         if (wavesurfer.isPlaying()) {
    //             wavesurfer.pause();
    //             setIsPlaying(false);
    //         } else {
    //             wavesurfer.play();
    //             setIsPlaying(true);
    //         }
    //     }
    // }, [wavesurfer, isPlaying])
    const visualizerCommonProps = {
        colors: ['#75206D', '#BA66A9'],
        iconsColor: '#75206D',
        showMainActionIcon: true,
        highFrequency: 10000,
        mirror: true,
    };

    return (
        <div className="bg-dark w-100 h-100">
            {/* <div ref={containerRef} />

            <p>Current audio: {audioUrls[urlIndex]}</p>

            <p>Current time: {formatTime(currentTime)}</p>

            <p>Total duration: {formatTime(totalDuration)}</p>

            <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
                <button onClick={onPrevious}>Previous Track</button>
                <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={onNext}>Next Track</button>
            </div> */}

            {/* <SpectrumVisualizer
                audio="https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav"
                theme={SpectrumVisualizerTheme.radialSquaredBars}
                colors={['red', 'blue']}
                iconsColor="green"
                backgroundColor="black"
                showMainActionIcon
                showLoaderIcon
                highFrequency={500}
            /> */}
            <SpectrumVisualizer
                audio="https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav"
                theme={SpectrumVisualizerTheme.radialSquaredBars}
                {...visualizerCommonProps}
            />
        </div>
    )
}

