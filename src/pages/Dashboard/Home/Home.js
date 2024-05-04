import React from 'react'
import { Col, Row, Typography } from 'antd'

const { Title } = Typography

export default function Index() {


    return (
        <>
            <Row className='mb-4'>
                <Col>
                    <Title level={3} className="mb-0">Dashboard - Home</Title>

                </Col>
            </Row>
        </>
    )
}
