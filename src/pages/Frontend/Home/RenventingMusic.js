import React, { useState } from 'react'
import reinventingicon from "assets/images/reinventing-icon.png"
import { GoClockFill } from "react-icons/go";
import { RiNumbersFill } from "react-icons/ri";
import { Col, Row, Input, Typography, Button } from 'antd'
import uidesktopImg from "assets/images/ui-example-desktop.png"
import { InfoCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input;


export default function RenventingMusic() {

    const [seconds, setSeconds] = useState(0);

    const handleDecrease = () => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
    };

    const handleIncrease = () => {
        setSeconds(seconds + 1);
    };

    return (
        <div className="py-5">
            <div className="py-5">
                <div className='py-5'>
                    <div className="">
                        <img src={reinventingicon} className='img-fluid mb-4' width="100px" alt="img" />
                        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                            <Title>Reinventing how we create music.</Title>
                        </div>
                        <div className="d-flex justify-content-center gap-2">
                            <span className='border border-dark rounded-4 px-3'>
                                Text-2-Audio
                            </span>
                            <span className='border border-dark rounded-4 px-3'>
                                Audio-2-Audio
                            </span>
                        </div>

                    </div>

                    <div className='py-5'>
                        {/* <img src={uidesktopImg} className='img-fluid' alt="img" /> */}
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
                                        <Button type='primary' size='large' shape="round">Generate</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={24} lg={16} xxl={16}>
                                <div className='mb-3'>
                                    <div className="card rounded-4 border-0 p-4 h-100">
                                        <h1>card 2</h1>
                                    </div>
                                </div>
                                <div>
                                    <div className="card rounded-4 border-0 p-4 h-100">
                                        <h1>card 3</h1>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
