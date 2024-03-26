import React, { useRef, useState } from 'react';
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

const musicData = [
    { title: "Music 1", url: audio1 },
    { title: "Music 2", url: audio2 },
    { title: "Music 3", url: audio3 }
];

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


    let navigate = useNavigate()
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

    return (
        <div className={`home dashboard bg-primary min-vh-100`}>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">
                    <Row gutter={[16, 16]} className='mb-4'>
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
                                <div className='p-4 d-flex flex-column justify-content-between'>
                                    <div className='text-center'>
                                        <Button type={`${activeBtn === "music" ? "primary" : "default"}`} shape="round" className='me-2' onClick={handleText2Music}>Text-2-Music</Button>
                                        <Button type={`${activeBtn === "speech" ? "primary" : "default"}`} shape="round" onClick={handleText2Speech}>Text-2-Speech</Button>
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

                    <div>
                        <RenventingMusic />
                    </div>

                </div>
            </div>
        </div >
    )
}
