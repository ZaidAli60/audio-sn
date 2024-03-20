import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import audioFile from "assets/images/audio.mp3";
import WavesurferPlayer from '@wavesurfer/react';
import musicImg from "assets/images/by-musicians.png";
import RenventingMusic from './RenventingMusic';
import gifVideo from "assets//video/vid_sub.mp4"
import audioGif from "assets/video/audio.gif"
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";


const { Text } = Typography

export default function Home() {

    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const timerRef = useRef(null);
    const [wave, setWave] = useState(null);

    const onReady = (ws) => {
        setWavesurfer(ws);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(ws.getDuration());
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

    const formatTime = (timeInSeconds) => {
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
                            <div className='card rounded-4 border-0' style={{ width: "100%", height: "100%" }}  >
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
                                            <Button type='primary' shape="round">Try it out</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={16}>
                            {/* <div className="card border-round-0 p-3" style={{ borderColor: "white", backgroundColor: "#f4f1ec", height: "100%" }} >
                                <div className="d-flex flex-column justify-content-between">
                                    <Text className=' fs-5 opacity-75'>
                                        Ambient Techno, meditation, Scandinavian Forest, 808 drum machine, 808 kick, claps, shaker, synthesizer, synth bass, Synth Drones, beautiful, peaceful, Ethereal, Natural, 122 BPM, Instrumental
                                    </Text>
                                    <div className='py-5 d-flex flex-column justify-content-center align-items-center'>
                                        <img className='img-fluid  ' style={{ width: "40%" }} src={musicImg} alt="img" />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className='me-2'>
                                            <button className='btn btn-light rounded-5 border-0' onClick={onPlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</button>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                            <span className="current-time">{formatTime(currentTime)}</span>
                                            <div style={{ width: "100%" }}>
                                                <WavesurferPlayer
                                                    height={50}
                                                    waveColor="rgb(200, 0, 200)"
                                                    progressColor="rgb(100, 0, 100)"
                                                    barWidth="1"
                                                    barGap="1"
                                                    barRadius="1"
                                                    url={audioFile}
                                                    // url="https://wavesurfer.xyz/d740cbeb-abfb-43ca-978d-ddf0cca44716"
                                                    onReady={onReady}
                                                    onPlay={() => setIsPlaying(true)}
                                                    onPause={() => setIsPlaying(false)}
                                                />
                                            </div>
                                            <span className="duration-time">  {formatTime(duration)}</span>
                                        </div>
                                    </div>
                                </div> */}
                            {/* </div> */}
                            <div className='card rounded-4 border-0' style={{ width: "100%", height: "100%", borderColor: "white", backgroundColor: "#f4f1ec", }}  >
                                <div className='p-3 d-flex flex-column justify-content-between'>
                                    <div>
                                        <Button type='primary' shape="round">Text-2-Music</Button>
                                        <Button type='primary' shape="round">Text-2-Speech</Button>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <Button shape="circle" size='large' ><TbPlayerTrackPrevFilled className='fs-5' /></Button>
                                        </div>
                                        <img src={audioGif} className='img-fluid' alt="gif" />
                                        <div>
                                            <Button shape="circle" size='large' ><TbPlayerTrackNextFilled className='fs-5' /></Button>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Ambient Techno, meditation, Scandinavian Forest, 808 drum machine, 808 kick, claps, shaker, synthesizer, synth bass, Synth Drones, beautiful, peaceful, Ethereal, Natural, 122 BPM, Instrumental</p>
                                    </div>
                                    <div className="card border-0 rounded-4">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className='me-2'>
                                                <Button shape="circle" size='large' onClick={onPlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                                {/* <button className='btn btn-light rounded-5 border-0' onClick={onPlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</button> */}
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                                <span className="current-time">{formatTime(currentTime)}</span>
                                                <div style={{ width: "100%" }}>
                                                    <WavesurferPlayer
                                                        height={50}
                                                        waveColor="rgb(169,168,178)"
                                                        progressColor="rgb(200, 0, 200)"
                                                        barWidth="1"
                                                        barGap="1"
                                                        barRadius="1"
                                                        url={audioFile}
                                                        // url="https://wavesurfer.xyz/d740cbeb-abfb-43ca-978d-ddf0cca44716"
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
