import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Button } from 'antd';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import audio1 from "assets/music/audio.mp3";
import audio2 from "assets/music/audio2.mp3";
import audio3 from "assets/music/audio3.mp3";
import WavesurferPlayer from '@wavesurfer/react';
import RenventingMusic from './RenventingMusic';
import gifVideo from "assets/video/vid_sub.mp4"
import circularWaves from "assets/images/circular-wave.gif"
import circle from "assets/images/circle.png"
import tss1 from "assets/tts/TTS.wav"
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../../components/frontend/formatDuration';
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

const musicData = [
    { title: "Music 1", url: audio1 },
    { title: "Music 2", url: audio2 },
    { title: "Music 3", url: audio3 }
];

const randomMusic = [
    { title: "Intimate session, hopeful, modern folk-pop, capoed melody", url: audio100, img: Music },
    { title: "Indie Rock, Strings, Drum Kit, Electric Bass, Percussion, Shaker, Tambourine", url: audio101, img: Music1 },
    { title: "Indie Rock, Strings, Drum Kit, Electric Bass, Percussion, Shaker, Tambourine, Melancholic", url: audio102, img: Music2 },
    { title: "Indie Rock, Strings, Drum Kit, Electric Bass, Percussion, Shaker, Tambourine, Melancholic, Low-Key, 110 BPM", url: audio103, img: Music3 },
    { title: "Post-Rock, Guitars, Drum Kit, Bass, Strings, Eupho", url: audio104, img: Music4 },
    { title: "Post-Rock, Guitars, Drum Kit, Bass, Strings, Eupho", url: audio105, img: Music2 },
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

const speechData = [
    { title: "Speech 1", url: tss1 },
    { title: "Speech 2", url: "speech2" },
    { title: "Speech 3", url: "speech3" }
];

export default function Home() {

    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const timerRef = useRef(null);
    const [activeBtn, setActiveBtn] = useState("music")
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [durationList, setDurationList] = useState([]);

    let navigate = useNavigate()
    useEffect(() => {
        const newDurationList = [];

        randomMusic.forEach((item, index) => {
            const audio = new Audio(item.url);
            audio.addEventListener('loadedmetadata', () => {
                newDurationList[index] = formatDuration(audio.duration);
                setDurationList([...newDurationList]);
            });
        });
    }, []);

    // for bottom player songs code and states
    const [wavesurferBottom, setWavesurferBottom] = useState(null);
    const [isPlayingBottom, setIsPlayingBottom] = useState(false);
    const [activeBtnBottom, setActiveBtnBottom] = useState("musicBottom")
    const [currentTimeBottom, setCurrentTimeBottom] = useState(0);
    const [durationBottom, setDurationBottom] = useState(0);
    const [currentSongTitle, setCurrentSongTitle] = useState(randomMusic[0]?.title);
    const [currentSongIndexBottom, setCurrentSongIndexBottom] = useState(0);
    const timerRefBottom = useRef(null);

    const onPlayPauseBottom = () => {
        if (wavesurferBottom) {
            wavesurferBottom.playPause();
            setIsPlayingBottom(!isPlayingBottom);
            if (!isPlayingBottom) {
                startTimerBottom();
            } else {
                clearInterval(timerRefBottom.current);
            }
        }
    };
    const startTimerBottom = () => {
        timerRefBottom.current = setInterval(() => {
            setCurrentTimeBottom(wavesurferBottom.getCurrentTime());
        }, 1000);
    };
    const onReadyBottom = ws => {
        setWavesurferBottom(ws);
        setIsPlayingBottom(false);
        setDurationBottom(ws.getDuration());
        setCurrentTimeBottom(ws.getCurrentTime());
    };

    // const onReadyBottom = (ws, audioUrl) => {
    //     setWavesurferBottom(ws);
    //     setIsPlayingBottom(false);
    //     setDurationBottom(ws.getDuration());
    //     setCurrentTimeBottom(ws.getCurrentTime());
    //     ws.load(audioUrl); // Load the audio URL into the bottom player
    // };

    const handleNextSongBottom = () => {
        const nextIndex = (currentSongIndexBottom + 1) % randomMusic.length;
        setCurrentSongIndexBottom(nextIndex);
        setCurrentSongTitle(randomMusic[nextIndex].title); // Update current song title
        setIsPlayingBottom(false); // Auto-play next song
    };


    const handlePrevSongBottom = () => {
        const prevIndex = (currentSongIndexBottom - 1 + randomMusic.length) % randomMusic.length;
        setCurrentSongIndexBottom(prevIndex);
        setCurrentSongTitle(randomMusic[prevIndex].title);
        setIsPlayingBottom(false);
    };


    // const togglePlayback = () => {
    //     setIsPlaying(prevState => !prevState);
    // };

    const handleText2Music = () => {
        setActiveBtn("music");
        setCurrentSongIndex(0); // Reset song index when switching to music
    }

    const handleText2Speech = () => {
        setActiveBtn("speech");
        setCurrentSongIndex(0); // Reset song index when switching to speech
    }

    const handleNextSong = () => {
        const data = activeBtn === "music" ? musicData : speechData;
        const nextIndex = (currentSongIndex + 1) % data.length;
        setCurrentSongIndex(nextIndex);
        setIsPlaying(false); // Auto-play next song
    };

    const handlePrevSong = () => {
        const data = activeBtn === "music" ? musicData : speechData;
        const prevIndex = (currentSongIndex - 1 + data.length) % data.length;
        setCurrentSongIndex(prevIndex);
        setIsPlaying(false); // Auto-play previous song
    };

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

    const handleMusicClick = (index) => {
        setCurrentSongIndex(index);
        const audioUrl = randomMusic[index].url; // Get the URL of the clicked song
        const audio = new Audio(audioUrl);
        setIsPlaying(false); // Pause the top player when changing the song
        setIsPlayingBottom(false); // Pause the bottom player when changing the song
        onReady(wavesurfer, audio); // Update the top player with the new audio
        onReadyBottom(wavesurferBottom, audioUrl); // Update the bottom player with the new audio URL
    };

    return (
        <div className={`home dashboard bg-primary min-vh-100`}>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">
                    <Row gutter={[16, 16]} className='mb-5'>
                        <Col xs={24} lg={8}>
                            <div className='card rounded-4 border-0' style={{ width: "100%", height: "80vh" }}  >
                                <video src={gifVideo} className='rounded-4' autoPlay muted loop playsInline controls={false}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }} >
                                </video>
                                <div className='z-3 p-3 h-100' >
                                    <div className='z-3 p-3 d-flex flex-column justify-content-between h-100'>
                                        <div className='mb-3'>
                                            <h1 className='fw-bold'>Create music <br />with AI.</h1>
                                        </div>
                                        <div>
                                            <p className='fs-5'>Generate high-quality audio that you can use commercially.</p>
                                            <p className='fs-5'>Get started for free.</p>
                                            <Button type='primary' shape="round" onClick={() => navigate("/generate")}>Try it out</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={16}>
                            <div className='card rounded-4 border-0' style={{ width: "100%", height: "80vh", borderColor: "white", backgroundColor: "#f4f1ec" }}>
                                <div className='p-4 d-flex flex-column justify-content-between' style={{ flexGrow: 1 }}>
                                    <div className='text-center'>
                                        <Button type={`${activeBtn === "music" ? "primary" : "default"}`} shape="round" className='me-2' onClick={handleText2Music}>Text-2-Music</Button>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center py-2'>
                                        <div>
                                            <Button shape="circle" size='large' onClick={() => handlePrevSong()}><TbPlayerTrackPrevFilled className='fs-5' /></Button>
                                        </div>
                                        <img src={`${isPlaying ? circularWaves : circle}`} className='img-fluid sm-audio-img' alt="Circular Waves" />
                                        <div>
                                            <Button shape="circle" size='large' onClick={() => handleNextSong()}><TbPlayerTrackNextFilled className='fs-5' /></Button>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{activeBtn === "music" ? musicData[currentSongIndex]?.title : speechData[currentSongIndex]?.title}</p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className='me-2'>
                                            <Button shape="circle" size='large' onClick={onPlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                            <span className="current-time">{formatTime(currentTime)}</span>
                                            <div style={{ width: "100%" }}>
                                                <WavesurferPlayer
                                                    height={40}
                                                    waveColor="rgb(169,168,178)"
                                                    progressColor="rgb(200, 0, 200)"
                                                    barWidth="1"
                                                    barGap="1"
                                                    barRadius="1"
                                                    url={activeBtn === "music" ? musicData[currentSongIndex]?.url : speechData[currentSongIndex]?.url}
                                                    onReady={onReady}
                                                    onPlay={() => setIsPlaying(true)}
                                                    onPause={() => setIsPlaying(false)}
                                                />
                                            </div>
                                            <span className="duration-time">  {formatTime(duration)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Renventing How to create Music Section */}

                    {/* <div>
                        <RenventingMusic />
                    </div> */}

                    {/* Mix Tape */}
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <h5 className='fw-bold'>Mixtape</h5>
                        <img src={Curve} alt="Cure" className='img-fluid' width={50} height={50} />
                        <div className='d-none d-md-block'></div>
                    </div>
                    <div className="row rounded-top-4 m-0 p-0" style={{ backgroundColor: '#f4f1ec' }}>
                        <div className="col-sm-12 col-md-6 d-flex flex-row p-0 overflow-y-auto" style={{ height: '729px' }}>
                            <div className='bg-red w-100 p-4'>
                                <div className="d-flex flex-column">
                                    {randomMusic.map((item, index) => (
                                        <div
                                            className="d-flex mb-3"
                                            key={index}
                                            onClick={() => {
                                                handleMusicClick(index);
                                                setCurrentSongTitle(item.title);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img src={item.img} className='me-3' alt="" height={50} width={50} />
                                            <div>
                                                <p className='p-0 m-0 fs-6'>{truncateTitle(item.title, 85)}</p>
                                                <p className='p-0 m-0'>{durationList[index] || ''}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 p-0">
                            <div className='bg-white w-100 p-4 h-100 title-song fs-6 rounded-top-4'>
                                {currentSongTitle}
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img src={`${isPlayingBottom ? circularWaves : circle}`} className='img-fluid ' alt="Circular Waves" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-3 rounded-bottom-4 mb-5' style={{ backgroundColor: "#fff" }}>
                        <div className="d-flex justify-content-center align-items-center rounded-4">
                            {/* <div className='me-2'>
                                <Button shape="circle" size='large' onClick={onPlayPauseBottom}>{isPlayingBottom ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                            </div> */}
                            <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                <div>
                                    <Button shape="circle" size='large' onClick={() => handlePrevSongBottom()}><TbPlayerTrackPrevFilled className='fs-5' /></Button>
                                </div>
                                <div className='me-1'>
                                    <Button shape="circle" size='large' onClick={onPlayPauseBottom}>{isPlayingBottom ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                </div>
                                <div>
                                    <Button shape="circle" size='large' onClick={() => handleNextSongBottom()}><TbPlayerTrackNextFilled className='fs-5' /></Button>
                                </div>
                                <span className="current-time">{formatTime(currentTimeBottom)}</span>
                                <div style={{ width: "100%" }}>
                                    <WavesurferPlayer
                                        height={40}
                                        waveColor="rgb(169,168,178)"
                                        progressColor="rgb(200, 0, 200)"
                                        barWidth="1"
                                        barGap="1"
                                        barRadius="1"
                                        url={activeBtnBottom === "musicBottom" ? randomMusic[currentSongIndexBottom]?.url : speechData[currentSongIndexBottom]?.url || randomMusic[0]?.url}
                                        onReady={(ws) => onReadyBottom(ws, new Audio(randomMusic[currentSongIndexBottom]?.url))}
                                        onPlay={() => setIsPlayingBottom(true)}
                                        onPause={() => setIsPlayingBottom(false)}
                                    />
                                </div>
                                <span className="duration-time"> {formatTime(durationBottom)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
