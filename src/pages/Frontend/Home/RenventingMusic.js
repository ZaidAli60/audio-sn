import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import WavesurferPlayer from '@wavesurfer/react';
import circularWaves from "assets/images/circular-wave.gif"
import Music from '../../../assets/images/SoundBackgrounds/1.png'
import Music1 from '../../../assets/images/SoundBackgrounds/3.png'
import Music2 from '../../../assets/images/SoundBackgrounds/2.png'
import Music3 from '../../../assets/images/SoundBackgrounds/4.png'
import Music4 from '../../../assets/images/SoundBackgrounds/5.png'
import audio100 from "../../../assets/music/sounds/1.mp3"
import audio101 from "../../../assets/music/sounds/2.mp3"
import audio102 from "../../../assets/music/sounds/3.mp3"
import audio103 from "../../../assets/music/sounds/4.mp3"
import audio104 from "../../../assets/music/sounds/5.mp3"
import audio105 from "../../../assets/music/sounds/6.mp3"
import audio106 from "../../../assets/music/sounds/7.mp3"
import audio107 from "../../../assets/music/sounds/8.mp3"
import audio108 from "../../../assets/music/sounds/9.mp3"
import audio109 from "../../../assets/music/sounds/10.mp3"
import audio110 from "../../../assets/music/sounds/11.mp3"
import audio111 from "../../../assets/music/sounds/12.mp3"
import audio112 from "../../../assets/music/sounds/13.mp3"
import audio113 from "../../../assets/music/sounds/14.mp3"
import audio114 from "../../../assets/music/sounds/15.mp3"
import Curve from '../../../assets/images/curve.svg'
import circle from "assets/images/circle.png"


const randomMusic = [
    { title: "1 Intimate session, hopeful, modern folk-pop, capoed melody", url: audio100, img: Music },
    { title: "2 Indie Rock, Strings, Drum Kit, Electric Bass, Percussion, Shaker, Tambourine", url: audio101, img: Music1 },
    { title: "3 Indie Rock, Strings, Drum Kit, Electric Bass, Percussion, Shaker, Tambourine, Melancholic", url: audio102, img: Music2 },
    { title: "4 Indie Rock, Strings, Drum Kit, Electric Bass, Percussion, Shaker, Tambourine, Melancholic, Low-Key, 110 BPM", url: audio103, img: Music3 },
    { title: "5 Post-Rock, Guitars, Drum Kit, Bass, Strings, Eupho", url: audio104, img: Music4 },
    { title: "6 Post-Rock, Guitars, Drum Kit, Bass, Strings, Eupho", url: audio105, img: Music2 },
    { title: "Trance, Ibiza, Beach, Sun, 4 AM, Progressive, Synthesizer, 909, Dramatic Chords, Choir, Euphoric, Nostalgic, Dynamic, Flowing", url: audio106, img: Music1 },
    { title: "Trance, Ibiza, Beach, Sun, 4 AM, Progressive, Synthesizer, 909, Dramatic Chords, Choir, Euphoric, Nostalgic, Dynamic, Flowing", url: audio107, img: Music2 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio108, img: Music3 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio109, img: Music1 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio110, img: Music2 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio111, img: Music3 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio112, img: Music4 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio113, img: Music },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio114, img: Music1 },
    { title: "Pop, Pop-Electronic, Ballad, Billboard, Drum Machine, Bass, Lush Synthersizer Pads", url: audio108, img: Music2 },
]

export default function RenventingMusic() {

    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentTitle, setCurrentTitle] = useState('');
    const timerRef = useRef(null);

    useEffect(() => {
        setCurrentTitle(randomMusic[currentSongIndex].title);
        // eslint-disable-next-line
    }, [currentSongIndex]);

    useEffect(() => {
        setCurrentTitle(randomMusic[currentSongIndex].title)
        // eslint-disable-next-line
    }, [])

    const handleNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % randomMusic.length;
        setCurrentSongIndex(nextIndex);
        setCurrentTitle(randomMusic[nextIndex].title);
    };

    const handlePrevSong = () => {
        const prevIndex = (currentSongIndex - 1 + randomMusic.length) % randomMusic.length;
        setCurrentSongIndex(prevIndex);
        setCurrentTitle(randomMusic[prevIndex].title);
    };

    const handleSelectMusic = (data, index) => {
        if (wavesurfer) {
            setCurrentSongIndex(index); // Update current song index
            setCurrentTitle(data.title); // Update current title
            wavesurfer.load(data.url);
            wavesurfer.play();
        }
    }

    const onReady = ws => {
        setWavesurfer(ws);
        setIsPlaying(false);
        setDuration(ws.getDuration());
        setCurrentTime(ws.getCurrentTime()); // Set current time to the correct value when new song is loaded and ready
    };

    const onPlayPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
                startTimer();
            } else {
                clearInterval(timerRef.current);
            }
        }
    };

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setCurrentTime(wavesurfer.getCurrentTime());
        }, 1000);
    };

    const formatTime = timeInSeconds => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return `${title.slice(0, maxLength)}...`;
        }
        return title;
    };

    return (
        <div className="py-5">
            <div className="py-5">
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <h5 className='fw-bold'>Mixtape</h5>
                    <img src={Curve} alt="Cure" className='img-fluid' width={50} height={50} />
                    <div className='d-none d-md-block'></div>
                </div>
                <div className="row rounded-top-4 m-0 p-0" style={{ backgroundColor: '#f4f1ec' }}>
                    {/* Music List */}
                    <div className="col-sm-12 col-md-6 d-flex flex-row p-0 overflow-y-auto" style={{ height: '729px' }}>
                        <div className='bg-red w-100 p-4'>
                            <div className="d-flex flex-column">
                                {randomMusic.map((item, index) => (
                                    <div className="card p-2 border-0 " style={{ backgroundColor: "#f4f1ec" }}>
                                        <div
                                            className="d-flex"
                                            key={index}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSelectMusic(item, index)} // Set music when clicked
                                        >
                                            <img src={item.img} className='me-3' alt="" height={50} width={50} />
                                            <div>
                                                <p className='p-0 m-0 fs-6'>{truncateTitle(item.title, 85)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Music Player */}
                    <div className="col-sm-12 col-md-6 p-0">
                        <div className='bg-white w-100 p-4 h-100 title-song fs-6 rounded-top-4'>
                            <div>
                                <p>{currentTitle}</p>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={`${isPlaying ? circularWaves : circle}`} className='img-fluid ' alt="Circular Waves" />
                            </div>
                        </div>
                    </div>
                    {/* Music Controls */}
                    <div className='p-3 rounded-bottom-4 mb-5' style={{ backgroundColor: "#fff" }}>
                        <div className="d-flex justify-content-center align-items-center rounded-4">
                            <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                <div>
                                    <Button shape="circle" size='large' onClick={handlePrevSong}><TbPlayerTrackPrevFilled className='fs-5' /></Button>
                                </div>
                                <div className='me-1'>
                                    <Button shape="circle" size='large' onClick={onPlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                </div>
                                <div>
                                    <Button shape="circle" size='large' onClick={handleNextSong}><TbPlayerTrackNextFilled className='fs-5' /></Button>
                                </div>
                                <span className="current-time">{formatTime(currentTime)}</span>
                                <div style={{ width: "100%" }}>
                                    <WavesurferPlayer
                                        height={40}
                                        waveColor="rgb(169,168,178)"
                                        progressColor="rgb(200, 0, 200)"
                                        barWidth="1"
                                        barGap="1"
                                        barRadius="1"
                                        url={randomMusic[currentSongIndex].url} // Play current song URL
                                        onReady={onReady}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                </div>
                                <span className="duration-time"> {formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
