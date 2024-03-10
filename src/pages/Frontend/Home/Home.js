import React, { useRef, useState } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import homeImg from "assets/images/intro-bg.jpg";
import audioFile from "assets/images/audio.mp3";
import WavesurferPlayer from '@wavesurfer/react';
import musicImg from "assets/images/by-musicians.png";
import RenventingMusic from './RenventingMusic';

const { Title, Text } = Typography

export default function Home() {

    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const timerRef = useRef(null);

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
                        {/* <Col xs={24} lg={8}>
                            <div
                                className="card border-round-0 "
                                style={{
                                    with: "100%",
                                    height: "100%",
                                    clipPath: "polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)"
                                }}
                            >
                    
                                <img src={homeImg} alt="img" style={{ position: 'absolute', width: "100%", height: "100%", inset: "0" }} />
                                <div
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(226, 190, 154, 0.7)', // Adjust background color and opacity as needed
                                        width: '100%',
                                        height: '100%',
                                    }}
                                ></div>

                                <div className='p-4'
                                    style={{
                                        position: 'relative',
                                        color: 'white', // Change text color to be visible against the background
                                    }}
                                >
                                    <div className="d-flex flex-column justify-content-between flex-grow-1" style={{ height: "100%" }}>
                                        <Title className='mb-3'>
                                            Create music <br /> with AI.
                                        </Title>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, laboriosam moles
                                            </p>
                                            <Button type='primary' shape="round">Try it out</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col> */}
                        <Col xs={24} lg={8}>
                            <div
                                className="card border-round-0 "
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    clipPath: "polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)"
                                }}
                            >
                                {/* Overlay div for background color */}
                                <img src={homeImg} alt="img" style={{ position: 'absolute', width: "100%", height: "100%", inset: "0" }} />
                                <div
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(226, 190, 154, 0.7)',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                ></div>

                                <div className='p-4'
                                    style={{
                                        position: 'relative',
                                        color: 'white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <div className="d-flex flex-column justify-content-between flex-grow-1">
                                        <Title className='mb-3'>
                                            Create music <br /> with AI.
                                        </Title>
                                    </div>

                                    <div className="mt-auto">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, laboriosam moles
                                        </p>
                                        <Button type='primary' shape="round">Try it out</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>


                        <Col xs={24} lg={16}>
                            <div className="card border-round-0 p-4"
                                style={{
                                    borderColor: "white",
                                    backgroundColor: "#f4f1ec",
                                    clipPath: "polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)",
                                    height: "100%"
                                }}
                            >
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
