import React, { useEffect, useRef, useState } from 'react'
import { Col, Row, Typography, Button } from 'antd'
import homeImg from "assets/images/intro-bg.jpg"
import audioFile from "assets/images/audio.mp3"
import WaveSurfer from 'wavesurfer.js';

const { Title, Text } = Typography

export default function Home() {

    const wavesurferRef = useRef(null);

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

    //     wavesurfer.load(AudioFile);
    //     wavesurfer.on('ready', () => {
    //         wavesurfer.play();
    //     });
    // };
    const handlePlayAudio = () => {
        if (wavesurferRef.current) {
            // If wavesurfer instance already exists, destroy it before creating a new one
            wavesurferRef.current.destroy();
        }

        // Create a new wavesurfer instance
        const newWavesurfer = WaveSurfer.create({
            container: wavesurferRef.current,
            waveColor: '#999',
            progressColor: '#333',
            cursorWidth: 1,
            cursorColor: '#333',
            barWidth: 2,
            barHeight: 15, // Adjust the bar height as needed
            hideScrollbar: true,
            responsive: true,
        });

        // Load audio file and start playing
        newWavesurfer.load(audioFile);
        newWavesurfer.on('ready', () => {
            newWavesurfer.play();
        });

        // Update the wavesurferRef to store the new instance
        wavesurferRef.current = newWavesurfer;
    };

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

                                {/* <button onClick={handlePlayAudio}>Play Audio</button>
                                <div ref={wavesurferRef}></div> */}

                                <div>
                                    <button onClick={handlePlayAudio}>Play Audio</button>
                                    <div ref={wavesurferRef}></div>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    )
}
