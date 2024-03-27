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
import audio100 from "../../../assets/music/sounds/3D_Sms_Tone-8cb567fa-16e5-3b3a-84bc-e7ba9520bd1e.mp3"
import audio101 from "../../../assets/music/sounds/Apple_pay-a6151b88-42b2-441d-b515-5b1a9bac38b3.mp3"
import audio102 from "../../../assets/music/sounds/Arabic_Style_2010-f2641088-b6da-32f6-ab0c-5acd37396522.mp3"
import audio103 from "../../../assets/music/sounds/Blackberry_Classic-b3b4db91-7969-3a25-b98d-3d392c7766b8.mp3"
import audio104 from "../../../assets/music/sounds/Ehd_e_wafa-b2e970d0-9c52-4f1c-9de4-c2255c7b343b.mp3"
import audio105 from "../../../assets/music/sounds/Gyurza-9f3d7cc3-65db-4bff-9183-fbe478432b26.mp3"
import audio106 from "../../../assets/music/sounds/Hakkan_-i_cant_be-d606cb00-7170-446d-8ac6-0cfe71cc509b.mp3"
import audio107 from "../../../assets/music/sounds/iPhone_Original_Tone-7d7a1e22-2299-35de-b41d-13b332743f1e.mp3"
import audio108 from "../../../assets/music/sounds/Romantic_Message-0d82c8ad-140d-3957-840a-8fbf8a71115f.mp3"
import audio109 from "../../../assets/music/sounds/Sad_Ringtone-404c7a3c-27f6-3dad-a5fd-d6344492ed3b.mp3"
import audio110 from "../../../assets/music/sounds/Water_Drop-43908a1c-869f-4c62-85e1-1a3d05b8f776.mp3"

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
    { title: "Music 5", url: audio104, img: Music4 },
    { title: "Music 6", url: audio105, img: Music2 },
    { title: "Music 7", url: audio106, img: Music1 },
    { title: "Music 8", url: audio107, img: Music2 },
    { title: "Music 9", url: audio108, img: Music3 },
    { title: "Music 10", url: audio109, img: Music4 },
    { title: "Test Musics", url: audio110, img: Music4 },

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
    const [currentSongTitle, setCurrentSongTitle] = useState(null);
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
        setCurrentTimeBottom(ws.getCurrentTime()); // Set current time to the correct value when new song is loaded and ready
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
        const audio = new Audio(randomMusic[index].url);
        onReady(wavesurfer, audio);
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
                                        {/* <Button type={`${activeBtn === "speech" ? "primary" : "default"}`} shape="round" onClick={handleText2Speech}>Text-2-Speech</Button> */}
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center py-2'>
                                        <div>
                                            <Button shape="circle" size='large' onClick={() => handlePrevSong()}><TbPlayerTrackPrevFilled className='fs-5' /></Button>
                                        </div>
                                        <img src={`${isPlaying ? circularWaves : circle}`} className='img-fluid ' alt="Circular Waves" />
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
                    <div className="row withcut m-0 p-0" style={{ backgroundColor: '#f4f1ec' }}>
                        <div className="col d-flex flex-row p-0 overflow-y-auto" style={{ height: '729px' }}>
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
                                                <p className='p-0 m-0 fs-5'>{truncateTitle(item.title, 77)}</p>
                                                <p className='p-0 m-0'>{durationList[index] || ''}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col p-0">
                            <div className='bg-white w-100 p-4 withcut h-100 title-song fs-5'>
                                {currentSongTitle}
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img src={`${isPlayingBottom ? circularWaves : circle}`} className='img-fluid ' alt="Circular Waves" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-3 mb-5' style={{ backgroundColor: "#fff" }}>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='me-2'>
                                <Button shape="circle" size='large' onClick={onPlayPauseBottom}>{isPlayingBottom ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                            </div>
                            <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                <span className="current-time">{formatTime(currentTimeBottom)}</span>
                                <div style={{ width: "100%" }}>
                                    <WavesurferPlayer
                                        height={40}
                                        waveColor="rgb(169,168,178)"
                                        progressColor="rgb(200, 0, 200)"
                                        barWidth="1"
                                        barGap="1"
                                        barRadius="1"
                                        url={activeBtnBottom === "musicBottom" ? randomMusic[currentSongIndex]?.url : speechData[currentSongIndex]?.url}
                                        onReady={(ws) => onReadyBottom(ws, new Audio(randomMusic[currentSongIndex]?.url))}
                                        onPlay={() => setIsPlayingBottom(true)}
                                        onPause={() => setIsPlayingBottom(false)}
                                    />
                                </div>
                                <span className="duration-time"> {formatTime(durationBottom)}</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className='p-3 mb-5' style={{ backgroundColor: "#fff" }}>
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
                                        url={activeBtn === "music" ? randomMusic[currentSongIndex]?.url : speechData[currentSongIndex]?.url}
                                        // url={activeBtn === "music" ? musicData[currentSongIndex]?.url : speechData[currentSongIndex]?.url}
                                        onReady={onReady}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                </div>
                                <span className="duration-time">  {formatTime(duration)}</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    )
}
