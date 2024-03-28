import React, { useRef, useState } from 'react'
import { GoClockFill } from "react-icons/go";
import { RiNumbersFill } from "react-icons/ri";
import { Col, Row, Input, Typography, Button, Modal } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import WavesurferPlayer from '@wavesurfer/react';
import audio4 from "assets/music/deep-future-garage-royalty-free-music-163081.mp3"
import circularWaves from "assets/images/circular-wave.gif"
import circle from "assets/images/circle.png"
import axios from 'axios';
import { useAuthContext } from 'context/AuthContext';

const { Title, Text } = Typography
const { TextArea } = Input;
const SERVER_URL = process.env.REACT_APP_API_END_POINT

export default function Generate() {
    const { accessToken } = useAuthContext()
    const [seconds, setSeconds] = useState(0);
    const [wavesurfer, setWavesurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const timerRef = useRef(null);
    const [modal2Open, setModal2Open] = useState(false);

    console.log('accessToken', accessToken)

    const handleDecrease = () => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
    };

    const handleIncrease = () => {
        setSeconds(seconds + 1);
    };

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

    const handleGenerate = () => {
        const prompt = "This is a example"
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPcGVudGVuc29yQGhvdG1haWwuY29tIiwiZXhwIjoxNzExNTczODc4fQ.kFFc64PGNgk_Sdg7xTPPzkF1Un1jy8yyaD1GIjz7Yk4"
        // const config = { headers: { Authorization: `Bearer ${token} ` } }
        axios.post(`${SERVER_URL}/api/ttm_endpoint`, prompt)
            .then(res => {
                console.log('res', res)
            })
            .catch(err => {
                console.error('err', err)
                // setIsAppLoding(false)
            })
            .finally(() => {
                // setIsAppLoding(false)
            })
    }

    return (
        <div className='bg-primary'>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding py-5">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={24} lg={10} xxl={8}>
                            <div className="card rounded-4 border-0 p-4 h-100">
                                <div className='d-flex justify-content-between mb-2'>
                                    <Text>Prompt</Text>
                                    <div>
                                        <span className='me-2'>guide</span>
                                        <InfoCircleOutlined />
                                    </div>
                                </div>
                                <div className='mb-0'>
                                    <TextArea
                                        placeholder="Prompt here ..."
                                        autoSize={{
                                            minRows: 3,
                                            maxRows: 5,
                                        }}
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-4">
                                    <div className='d-flex align-items-center gap-2'>
                                        <GoClockFill className='fs-5' />
                                        <p className='mb-0'>Duration <span className="d-none d-md-inline">(max. 45s)</span></p>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <Button shape='circle' size='small' onClick={handleDecrease}>
                                            <span className="btn-icon">
                                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.34315 3.34314L7 9L12.6569 3.34315" stroke="currentColor"></path>
                                                </svg>
                                            </span>
                                        </Button>
                                        <Input style={{ width: '70px' }} disabled value={0} />
                                        <span className="text-muted">m</span>
                                        <Input variant="filled" style={{ width: '70px' }} value={seconds} />
                                        <span className="text-muted">s</span>
                                        <Button shape='circle' size='small' onClick={handleIncrease}>
                                            <span className="btn-icon">
                                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6569 8.84338L7 3.18652L1.34314 8.84338" stroke="currentColor"></path>
                                                </svg>
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                                <hr className='p-0 m-0' />
                                <div className="d-flex justify-content-between align-items-center py-4">
                                    <div className='d-flex align-items-center gap-2'>
                                        <RiNumbersFill className='fs-5' />
                                        <p className='mb-0'>Number of results <span className="d-none d-md-inline">(max.5)</span></p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Input variant="filled" style={{ width: '70px' }} value={5} />
                                    </div>
                                </div>
                                <hr className='p-0 m-0' />
                                <div className='pt-3 d-flex justify-content-end'>
                                    <Button type='primary' size='large' shape="round" onClick={() => handleGenerate()}>Generate</Button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} md={24} lg={14} xxl={16}>
                            <div className='mb-3'>
                                <div className="card rounded-4 border-0 p-4 h-100">
                                    <div className='d-flex gap-3 mb-1'>
                                        <div >
                                            <img src={`${isPlaying ? circularWaves : circle}`} className='img-fluid' alt="Circular Waves" />
                                        </div>
                                        <div>
                                            <Title level={4}>Deep Future</Title>
                                            <p>Deep Future Garage (Royalty Free Music)</p>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <div className='d-flex justify-content-center align-items-center me-4' style={{ flex: '1 1 0%', gap: "1rem" }}>
                                            <Button shape="circle" size='large' onClick={onPlayPause}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                            <span className="current-time">{formatTime(currentTime)}</span>
                                            <div style={{ width: "100%" }}>
                                                <WavesurferPlayer
                                                    height={30}
                                                    waveColor="rgb(169,168,178)"
                                                    progressColor="rgb(200, 0, 200)"
                                                    barWidth="1"
                                                    barGap="1"
                                                    barRadius="1"
                                                    url={audio4}
                                                    onReady={onReady}
                                                    onPlay={() => setIsPlaying(true)}
                                                    onPause={() => setIsPlaying(false)}
                                                />
                                            </div>
                                            <span className="duration-time">  {formatTime(duration)}</span>
                                        </div>
                                        <div>
                                            <Button type="text" size='large' shape='circle' onClick={() => setModal2Open(true)}><IoShareSocialOutline className='fs-5 opacity-75' /></Button>
                                            <Button type="text" size='large' shape='circle' ><AiOutlineDownload className='fs-5 opacity-75' /></Button>
                                            <Modal
                                                title="Share track link"
                                                centered
                                                open={modal2Open}
                                                onOk={() => setModal2Open(false)}
                                                onCancel={() => setModal2Open(false)}
                                                footer={null}
                                            >
                                                <p>some contents...</p>
                                                <p>some contents...</p>
                                                <p>some contents...</p>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card rounded-4 border-0 p-4 h-100">
                                    <div className="badge text-bg-primary mb-4" style={{ width: "70px" }}>History</div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex align-items-center gap-3'>
                                            <Button shape="circle" size='large' onClick={onPlayPause}>
                                                {isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}
                                            </Button>
                                            <div>
                                                <Title level={5}>Deep Future Garage (Royalty Free Music)</Title>
                                                <span className="opacity-75"> {formatTime(duration)} / 1 day ago</span>
                                            </div>
                                        </div>
                                        <div>
                                            <Button type="text" size='large' shape='circle' onClick={() => setModal2Open(true)}>
                                                <IoShareSocialOutline className='fs-5 opacity-75' />
                                            </Button>
                                            <Button type="text" size='large' shape='circle'>
                                                <AiOutlineDownload className='fs-5 opacity-75' />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
