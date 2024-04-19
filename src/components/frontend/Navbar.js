import React, { useEffect, useState } from 'react'
import { Avatar, Button, Drawer, Dropdown } from 'antd'
import { useNavigate } from 'react-router-dom';
// import { data } from "pages/Dashboard/SidebarItems"
import { LiaBarsSolid } from 'react-icons/lia'
import { useAuthContext } from 'context/AuthContext';
import { UserOutlined } from "@ant-design/icons"

export default function Navbar() {
    const { isAuthenticated, user, handleLogout } = useAuthContext()
    const [selectedItem, setSelectedItem] = useState("home");
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isNavbarShadowed, setIsNavbarShadowed] = useState(false);
    console.log('selectedItem', selectedItem)
    let navigate = useNavigate()

    useEffect(() => {
        let keys = window.location.pathname.split("/")
        if (keys.length === 2 || (keys.length === 3 && !keys[2])) {
            setSelectedItem("home")
        } else {
            setSelectedItem(keys[2])
        }
    }, [])

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsNavbarShadowed(true);
        } else {
            setIsNavbarShadowed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <>

            <nav className={`navbar py-3 custom-navbar sticky-top  bg-secondary`}>
                <div className="container-fluid">
                    <img src={`${window.logoLight}`} className='img-fluid me-lg-5 me-auto' style={{ width: "130px", height: "auto" }} alt="Audio" />
                    <div className="navbar-nav me-auto">
                    </div>
                    {/* <div className='icon-container me-2 d-none d-lg-block'>
                        <Button className={`custom-btn`} shape="round" style={{ backgroundColor: "#8fb9ff" }}>Try it out for free</Button>
                    </div> */}
                    <div className="d-none d-lg-block me-2">


                        {
                            !isAuthenticated ?
                                <Button className={`custom-btn loginbtn`} shape="round" size='large' onClick={() => { navigate("auth") }}>Create</Button>
                                :
                                <Dropdown
                                    menu={{
                                        items: [
                                            { label: "My Profile", onClick: () => { } },
                                            { label: "Logout", onClick: () => { handleLogout() } },
                                        ]
                                    }}
                                    placement="bottom"
                                    trigger={['click']}
                                >

                                    <Avatar size="large" icon={user?.userData?.picture ? null : <UserOutlined />} src={user?.userData?.picture} />

                                </Dropdown>

                        }
                    </div>
                    {/* <button className="navbar-toggler rounded-5 py-2 px-2" type="button" onClick={toggleDrawer} data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <LiaBarsSolid className="navbar-toggler-icon" style={{ fontSize: "14px" }} />
                    </button> */}
                </div>
            </nav>
            {/* <nav class="navbar px-xxl-5 custom-lg-padding custom-xxl-padding py-3 navbar-expand-lg position-fixed w-100" style={{ backgroundColor: "transparent" }}>
                <div class="container-fluid px-xxl-3 px-lg-4">

                    <img src={window.logoLight} className="img-fluid" style={{ width: "130px", height: "auto" }} alt="logo" />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <div class="d-flex gap-3">
                            <Button style={{ background: "transparent", color: "white" }}>Try it out</Button>
                            <Button style={{ background: "transparent", color: "white" }} onClick={() => { navigate("auth") }}>Log in</Button>
                        </div>
                    </div>
                </div>
            </nav> */}
            <Drawer
                title={
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='me-2'>

                            <img src={`${window.logoDark}`} className='img-fluid me-lg-5 me-auto' style={{ width: "130px", height: "auto" }} alt="Audio" />
                        </div>

                    </div>
                }
                placement="right"
                onClose={toggleDrawer}
                open={drawerVisible}
                bodyStyle={{ padding: 0 }}
                className='custom-drawer'
            >
                <div className='py-4'>

                </div>
            </Drawer>

        </>
    )
}
