import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Button } from 'antd';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import WavesurferPlayer from '@wavesurfer/react';
// import RenventingMusic from './RenventingMusic';
import gifVideo from "assets/video/vid_sub.mp4"
import circularWaves from "assets/images/circular-wave.gif"
import circle from "assets/images/circle.png"
import Music from '../../../assets/images/SoundBackgrounds/1.png'
import Music3 from '../../../assets/images/SoundBackgrounds/3.png'

const randomMusic = [
    { title: "Upbeat Happy Energetic Summer Pop Indie Rock Fun", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav", img: Music3 },
    { title: "1 Intimate session, hopeful, modern folk-pop, capoed melody", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711706048/bkr8d4jjd6zzpd4edvjn.mp3", img: Music },
    { title: "Upbeat Happy Energetic Summer Pop Indie Rock Fun", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711742714/TTM1_z9vxca.wav", img: Music3 },
    { title: "Upbeat Happy Energetic Summer Pop Indie Rock Fun", url: "https://res.cloudinary.com/dufkxmegs/video/upload/v1711744788/TTM_3_dfc6ya.wav", img: Music },
]

export default function Home() {

    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const timerRef = useRef(null);
    let navigate = useNavigate()

    const handleNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % randomMusic.length;
        setCurrentSongIndex(nextIndex);
    };

    const handlePrevSong = () => {
        const prevIndex = (currentSongIndex - 1 + randomMusic.length) % randomMusic.length;
        setCurrentSongIndex(prevIndex);
    };

    const handleSelectMusic = (data, index) => {
        if (wavesurfer) {
            setCurrentSongIndex(index); // Update current song index
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



    // const [wavesurfer, setWavesurfer] = useState(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [duration, setDuration] = useState(0);
    // const [currentSongIndex, setCurrentSongIndex] = useState(0);
    // const timerRef = useRef(null);
    // let navigate = useNavigate();

    // const handleNextSong = () => {
    //     const nextIndex = (currentSongIndex + 1) % randomMusic.length;
    //     setCurrentSongIndex(nextIndex);
    // };

    // const handlePrevSong = () => {
    //     const prevIndex = (currentSongIndex - 1 + randomMusic.length) % randomMusic.length;
    //     setCurrentSongIndex(prevIndex);
    // };

    // const handleSelectMusic = (data, index) => {
    //     if (wavesurfer) {
    //         console.log('Loading audio:', data.url);
    //         wavesurfer.load(data.url);
    //         wavesurfer.on('ready', () => {
    //             console.log('Audio loaded successfully');
    //             console.log('Playing audio...');
    //             wavesurfer.play();
    //         });
    //         setCurrentSongIndex(index); // Update current song index
    //     } else {
    //         console.error('wavesurfer instance is null');
    //     }
    // };

    // const onReady = ws => {
    //     setWavesurfer(ws);
    //     setIsPlaying(false);
    //     setDuration(ws.getDuration());
    //     setCurrentTime(ws.getCurrentTime()); // Set current time to the correct value when new song is loaded and ready
    // };

    // const onPlayPause = () => {
    //     if (wavesurfer) {
    //         wavesurfer.playPause();
    //         setIsPlaying(!isPlaying);
    //         if (!isPlaying) {
    //             startTimer();
    //         } else {
    //             clearInterval(timerRef.current);
    //         }
    //     }
    // };

    // const startTimer = () => {
    //     timerRef.current = setInterval(() => {
    //         setCurrentTime(wavesurfer.getCurrentTime());
    //     }, 1000);
    // };

    // const formatTime = timeInSeconds => {
    //     const minutes = Math.floor(timeInSeconds / 60);
    //     const seconds = Math.floor(timeInSeconds % 60);
    //     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    // };

    // // Cleanup timer on component unmount
    // useEffect(() => {
    //     return () => {
    //         clearInterval(timerRef.current);
    //     };
    // }, []);




    return (
        <div className={`home dashboard bg-primary min-vh-100`}>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">
                    <Row gutter={[16, 16]} className='mb-5'>
                        <Col xs={24} lg={8}>
                            <div className='card rounded-4 border-0' style={{ width: "100%", height: '100%' }}  >
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
                        <Col xs={24} lg={16}>
                            <div className='mb-2'>
                                <div className='card rounded-4 border-0' style={{ width: "100%", height: '100%', borderColor: "white", backgroundColor: "#f4f1ec" }}>
                                    <div className='p-4 d-flex flex-column justify-content-between' style={{ flexGrow: 1 }}>
                                        <div className='text-center'>
                                            <Button shape="round" >Text-2-Music</Button>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <Button shape="circle" size='large' onClick={() => handlePrevSong()}><TbPlayerTrackPrevFilled className='fs-5' /></Button>
                                            </div>
                                            <img src={`${isPlaying ? circularWaves : circle}`} className='img-fluid sm-audio-img' alt="Circular Waves" />
                                            <div>
                                                <Button shape="circle" size='large' onClick={() => handleNextSong()}><TbPlayerTrackNextFilled className='fs-5' /></Button>
                                            </div>
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
                                                        progressColor="rgb(58, 91, 201)"
                                                        barWidth="1"
                                                        barGap="1"
                                                        barRadius="1"
                                                        url={randomMusic[currentSongIndex].url}
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
                            <div>
                                <div className="card rounded-4 border-0 p-4 h-100" style={{ backgroundColor: "#f4f1ec" }}>
                                    <div>
                                        <div className="d-flex flex-column overflow-y-auto" style={{ height: '200px' }}>
                                            {randomMusic.map((item, index) => {
                                                return (<div className={`card border-0 music-card    p-1 mb-1 ${index === currentSongIndex ? 'selected' : ''}`} >
                                                    <div
                                                        className="d-flex"
                                                        key={index}
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleSelectMusic(item, index)} // Set music when clicked
                                                    >
                                                        <img src={item.img} className='me-3 img-fluid' alt="" height={50} width={50} />
                                                        <div>
                                                            <p className={`p-0 m-0 fs-6 para`}>{item.title}</p>
                                                            <span>0:45</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })}
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
                </div>
            </div>
        </div >
    )
}
