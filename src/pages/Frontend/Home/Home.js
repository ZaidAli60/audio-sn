import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Button } from 'antd';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
// import { TbPlayerTrackNextFilled } from "react-icons/tb";
// import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { useWavesurfer } from '@wavesurfer/react';
import gifVideo from "assets/video/vid_sub.mp4"
import circularWaves from "assets/images/circular-wave.gif"
import circle from "assets/images/circle.png"
import Music from '../../../assets/images/SoundBackgrounds/1.png'
import Music3 from '../../../assets/images/SoundBackgrounds/3.png'

const randomMusic = [
    { title: "Upbeat Happy Energetic Summer Pop Indie Rock Fun", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav", img: Music3, time: "0:15" },
    { title: "Groovy Cats 30_Advertising, Upbeat, Retro, Cool, Hip, Indie, Pop, Fun, Catchy", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711919931/TTM1_jwe5ww.wav", img: Music3, time: "0:15" },
    { title: "Timeless (Underscore) Pop Upbeat Cinematic Majestic Reflective Regal Powerful", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711920134/TTM2_dvwkyv.wav", img: Music3, time: "0:15" },
    { title: "Uplifting Stadium Pop Anthem Coldplay. Energetic Joyful Upbeat Claps Motivation", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711920201/TTM3_jgsy5f.wav", img: Music3, time: "0:15" },
    { title: "1 Intimate session, hopeful, modern folk-pop, capoed melody", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711706048/bkr8d4jjd6zzpd4edvjn.mp3", img: Music, time: "01:30" },
    { title: "Upbeat Happy Energetic Summer Pop Indie Rock Fun", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711742714/TTM1_z9vxca.wav", img: Music3, time: "0:15" },
    { title: "Upbeat Happy Energetic Summer Pop Indie Rock Fun", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711744788/TTM_3_dfc6ya.wav", img: Music, time: "0:15" },
]

export default function Home() {

    const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

    const containerRef = useRef(null)
    const [totalDuration, setTotalDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    let navigate = useNavigate()

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        height: 40,
        waveColor: "rgb(169,168,178)",
        progressColor: "rgb(58, 91, 201)",
        barWidth: "1",
        barGap: "1",
        barRadius: "1",
        url: randomMusic[currentSongIndex].url,
        autoPlay: false, // Disable autoplay
    });

    useEffect(() => {
        if (!wavesurfer) return;

        const onReadyCallback = () => {
            setTotalDuration(wavesurfer.getDuration());
            if (currentSongIndex !== 0) {
                wavesurfer.play();
                setIsPlaying(true);
            }
        };

        wavesurfer.on('ready', onReadyCallback);

        return () => {
            wavesurfer.un('ready', onReadyCallback);
        };
    }, [wavesurfer, currentSongIndex]); // Re-run effect when wavesurfer or currentSongIndex changes

    useEffect(() => {
        // Update current time every second
        const interval = setInterval(() => {
            if (wavesurfer && wavesurfer.isPlaying()) {
                setCurrentTime(wavesurfer.getCurrentTime());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [wavesurfer]);

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.on('finish', () => {
                setIsPlaying(false);
            });
        }
        return () => {
            wavesurfer && wavesurfer.un('finish');
        };
    }, [wavesurfer]);

    const onSelectMusic = (index) => {
        setCurrentSongIndex(index);
        if (wavesurfer) {
            wavesurfer.load(randomMusic[index].url); // Load the selected track
            setIsPlaying(true); // Start playing automatically
        }
    };

    const togglePlayPause = () => {
        if (wavesurfer) {
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
                setIsPlaying(false);
            } else {
                wavesurfer.play();
                setIsPlaying(true);
            }
        }
    };

    const togglePlayPauseSong = (index) => {
        if (index === currentSongIndex) {
            if (isPlaying) {
                wavesurfer.pause(); // Pause the currently playing song
                setIsPlaying(false);
            } else {
                wavesurfer.play(); // Play the currently paused song
                setIsPlaying(true);
            }
        } else {
            onSelectMusic(index); // Play the selected song
            setIsPlaying(true); // Ensure that isPlaying is set to true
        }
    };

    return (
        <div className={`home dashboard bg-primary min-vh-100`}>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">
                    <Row gutter={[16, 16]} className='mb-5'>
                        <Col xs={24} lg={8}>
                            <div className='card rounded-4 border-0' style={{ width: "100%", height: '85vh' }}  >
                                <video src={gifVideo} className='rounded-4 mb-0' autoPlay muted loop playsInline controls={false}
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
                        <Col xs={24} lg={16} style={{ height: '85vh' }} className='d-flex flex-column h-sm-auto'>
                            <div className='mb-2 d-flex flex-grow-1'>
                                <div className='card rounded-4 border-0 d-flex flex-column h-100 w-100' style={{ borderColor: "white", backgroundColor: "#f4f1ec", display: 'flex' }}>
                                    <div className='p-4 d-flex flex-column justify-content-between flex-grow-1'>
                                        <div className='text-center'>
                                            <Button shape="round">Text-2-Music</Button>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <img src={isPlaying ? circularWaves : circle} className='img-fluid sm-audio-img' alt="Circular Waves" />
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className='me-2'>
                                                <Button shape="circle" size='large' onClick={togglePlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center flex-grow-1' style={{ gap: "1rem" }}>
                                                <span className="current-time">{formatTime(currentTime)}</span>
                                                <div style={{ width: "100%" }}>
                                                    <div ref={containerRef} />
                                                </div>
                                                <span className="duration-time">{formatTime(totalDuration)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-4 border-0 p-4 flex-grow-1" style={{ backgroundColor: "#f4f1ec", overflowY: "auto", display: 'flex', flexDirection: 'column' }}>
                                {randomMusic.map((item, index) => (
                                    <div className={`card border-0 music-card p-1 mb-1 ${index === currentSongIndex ? 'selected' : ''}`} key={index} style={{ cursor: 'pointer' }} onClick={() => togglePlayPauseSong(index)}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='d-flex align-items-center'>
                                                <Button shape="circle" className='me-2' size='large'>
                                                    {index === currentSongIndex && isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}
                                                </Button>
                                                <p className={`p-0 m-0 fs-6 para`}>{item.title}</p>
                                            </div>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>



                        {/* <Col xs={24} lg={16} style={{ height: '85vh' }} className='d-flex flex-column h-sm-auto'>
                            <div className='mb-2 flex-grow-1'>
                                <div className='card rounded-4 border-0 d-flex flex-column h-100' style={{ width: "100%", borderColor: "white", backgroundColor: "#f4f1ec", display: 'flex' }}>
                                    <div className='p-4 d-flex flex-column justify-content-between flex-grow-1'>
                                        <div className='text-center'>
                                            <Button shape="round">Text-2-Music</Button>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <img src={isPlaying ? circularWaves : circle} className='img-fluid sm-audio-img' alt="Circular Waves" />
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className='me-2'>
                                                <Button shape="circle" size='large' onClick={togglePlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center flex-grow-1' style={{ gap: "1rem" }}>
                                                <span className="current-time">{formatTime(currentTime)}</span>
                                                <div style={{ width: "100%" }}>
                                                    <div ref={containerRef} />
                                                </div>
                                                <span className="duration-time">{formatTime(totalDuration)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-4 border-0 p-4 flex-grow-1" style={{ backgroundColor: "#f4f1ec", overflowY: "auto", display: 'flex', flexDirection: 'column' }}>
                                {randomMusic.map((item, index) => (
                                    <div className={`card border-0 music-card p-1 mb-1 ${index === currentSongIndex ? 'selected' : ''}`} key={index} style={{ cursor: 'pointer' }} onClick={() => togglePlayPauseSong(index)}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='d-flex align-items-center'>
                                                <Button shape="circle" className='me-2' size='large'>
                                                    {index === currentSongIndex && isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}
                                                </Button>
                                                <p className={`p-0 m-0 fs-6 para`}>{item.title}</p>
                                            </div>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col> */}

                        {/* <Col xs={24} lg={16} style={{ height: '85vh', }} className='d-flex flex-column h-sm-auto'>
                            <div className='mb-2' style={{ flexGrow: "1" }}>
                                <div className='card rounded-4 border-0 d-flex flex-column h-100' style={{ width: "100%", borderColor: "white", backgroundColor: "#f4f1ec" }}>
                                    <div className='p-4 d-flex flex-column justify-content-between' style={{ flexGrow: 1 }}>
                                        <div className='text-center'>
                                            <Button shape="round" >Text-2-Music</Button>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <img src={isPlaying ? circularWaves : circle} className='img-fluid sm-audio-img' alt="Circular Waves" />
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className='me-2'>
                                                <Button shape="circle" size='large' onClick={togglePlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                                <span className="current-time">{formatTime(currentTime)}</span>
                                                <div style={{ width: "100%" }}>
                                                    <div ref={containerRef} />
                                                </div>
                                                <span className="duration-time">{formatTime(totalDuration)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-4 border-0 p-4 h-100 h-sm-200" style={{ backgroundColor: "#f4f1ec", overflowY: "auto" }}>
                                {randomMusic.map((item, index) => (
                                    <div className={`card border-0 music-card p-1 mb-1 ${index === currentSongIndex ? 'selected' : ''}`} key={index} style={{ cursor: 'pointer' }} onClick={() => togglePlayPauseSong(index)}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='d-flex align-items-center'>
                                                <Button shape="circle" className='me-2' size='large'>
                                                    {index === currentSongIndex && isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}
                                                </Button>
                                                <p className={`p-0 m-0 fs-6 para`}>{item.title}</p>
                                            </div>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </Col> */}


                        {/* <Col xs={24} lg={16} style={{ height: '85vh' }} className='d-flex flex-column h-sm-auto'>
                            <div className='mb-2 flex-grow-1 d-flex' style={{ height: '50%' }}>
                                <div className='card rounded-4 border-0 d-flex flex-column h-100 w-100' style={{ borderColor: "white", backgroundColor: "#f4f1ec", display: 'flex' }}>
                                    <div className='p-4 d-flex flex-column justify-content-between flex-grow-1'>
                                        <div className='text-center'>
                                            <Button shape="round">Text-2-Music</Button>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <img src={isPlaying ? circularWaves : circle} className='img-fluid sm-audio-img' alt="Circular Waves" />
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className='me-2'>
                                                <Button shape="circle" size='large' onClick={togglePlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center flex-grow-1' style={{ gap: "1rem" }}>
                                                <span className="current-time">{formatTime(currentTime)}</span>
                                                <div style={{ width: "100%" }}>
                                                    <div ref={containerRef} />
                                                </div>
                                                <span className="duration-time">{formatTime(totalDuration)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card rounded-4 border-0 p-4 flex-grow-1" style={{ backgroundColor: "#f4f1ec", overflowY: "auto", display: 'flex', flexDirection: 'column', height: '50%' }}>
                                {randomMusic.map((item, index) => (
                                    <div className={`card border-0 music-card p-1 mb-1 ${index === currentSongIndex ? 'selected' : ''}`} key={index} style={{ cursor: 'pointer' }} onClick={() => togglePlayPauseSong(index)}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className='d-flex align-items-center'>
                                                <Button shape="circle" className='me-2' size='large'>
                                                    {index === currentSongIndex && isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}
                                                </Button>
                                                <p className={`p-0 m-0 fs-6 para`}>{item.title}</p>
                                            </div>
                                            <span>{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col> */}




                    </Row>

                    {/* Renventing How to create Music Section */}

                    {/* <div>
                        <RenventingMusic />
                    </div> */}
                </div>
            </div>
        </div >
    )
}
