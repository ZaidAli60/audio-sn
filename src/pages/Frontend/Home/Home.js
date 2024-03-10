import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Col, Row, Typography, Button } from 'antd'
import homeImg from "assets/images/intro-bg.jpg"
import audioFile from "assets/images/audio.mp3"
// import WaveSurfer from 'wavesurfer.js';
// import { WaveformContianer, Wave, PlayButton } from "./Waveform.styled";
// import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
// import RegionsPlugin from "wavesurfer.js/dist/plugins/wavesurfer.regions.min";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import WavesurferPlayer from '@wavesurfer/react'
const { Title, Text } = Typography

// const Buttons = styled.div`
//   display: inline-block;
// `;

// const Button = styled.button``;

export default function Home() {

    // const wavesurferRef = useRef(null);

    // const handlePlayAudio = () => {
    //     const wavesurfer = WaveSurfer.create({
    //         container: wavesurferRef.current,
    //         waveColor: '#999',
    //         progressColor: '#333',
    //         cursorWidth: 1,
    //         cursorColor: '#333',
    //         barWidth: 1,
    //         barHeight: 10,
    //         hideScrollbar: true,
    //         responsive: true,
    //     });

    //     wavesurfer.load(audioFile);
    //     wavesurfer.on('ready', () => {
    //         wavesurfer.play();
    //     });
    // };

    const [wavesurfer, setWavesurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const onReady = (ws) => {
        setWavesurfer(ws)
        setIsPlaying(false)
    }

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause()
    }

    return (
        <div className={`home dashboard bg-primary min-vh-100`}>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">

                    <Row gutter={[16, 16]} className='mb-4'>
                        <Col lg={8} >
                            <div
                                className="card border-round-0 "
                                style={{
                                    with: "100%",
                                    height: "auto",
                                    clipPath: "polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)"
                                }}
                            >
                                {/* Overlay div for background color */}
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
                                    <div className='d-flex flex-column justify-content-between' style={{ height: "600px" }} >
                                        <Title>
                                            Create music <br /> with AI.
                                        </Title>
                                        <div className='mt-auto'>
                                            <p>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, laboriosam moles
                                            </p>
                                            <Button type='primary' shape="round">Try it out</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Col>
                        <Col lg={16} >
                            <div className="card bg-white border-round-0 p-4"
                                style={{
                                    borderColor: "white",
                                    clipPath: "polygon(26px 0, 100% 0, 100% 100%, 0 100%, 0 26px)"
                                }}
                            >
                                <Text className=' fs-5 opacity-75'>
                                    Ambient Techno, meditation, Scandinavian Forest, 808 drum machine, 808 kick, claps, shaker, synthesizer, synth bass, Synth Drones, beautiful, peaceful, Ethereal, Natural, 122 BPM, Instrumental
                                </Text>

                                {/* <div>
                                    <button onClick={handlePlayAudio}>Play Audio</button>
                                    <div ref={wavesurferRef}></div>
                                </div> */}
                                <WavesurferPlayer
                                    height={100}
                                    // waveColor="violet"
                                    waveColor='rgb(200, 0, 200)'
                                    progressColor='rgb(100, 0, 100)'
                                    barWidth="2"
                                    // Optionally, specify the spacing between bars
                                    barGap="1"
                                    // And the bar radius
                                    barRadius="2"
                                    // url="https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3"
                                    url={`${audioFile}`}
                                    onReady={onReady}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                />

                                <button onClick={onPlayPause}>
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    )
}
