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
    // const [isNavbarShadowed, setIsNavbarShadowed] = useState(false);
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

    // const handleScroll = () => {
    //     if (window.scrollY > 0) {
    //         setIsNavbarShadowed(true);
    //     } else {
    //         setIsNavbarShadowed(false);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [])

    return (
        <>
            <nav className={`navbar px-xxl-5 custom-lg-padding custom-xxl-padding py-3 custom-navbar sticky-top  bg-primary`}>
                <div className="container-fluid px-xxl-3 px-lg-4">
                    <img src={`${window.logo}`} className='img-fluid me-lg-5 me-auto' style={{ width: "170px", height: "auto" }} alt="Audio" />
                    <div className="navbar-nav me-auto">
                    </div>
                    <div className='icon-container me-2 d-none d-lg-block'>
                        <Button className={`custom-btn`} shape="round" style={{ backgroundColor: "#8fb9ff" }}>Try it out for free</Button>
                    </div>
                    <div className="d-none d-lg-block me-2">
                        {/* {
                            isAuthenticated ?
                                <Button className={`custom-btn loginbtn`} shape="round" >Log out</Button>
                                :
                                <Button className={`custom-btn loginbtn`} shape="round" onClick={() => { navigate("auth/login") }}>Log in</Button>
                            } */}

                        {
                            !isAuthenticated ?
                                <Button className={`custom-btn loginbtn`} shape="round" onClick={() => { navigate("auth") }}>Log in</Button>
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
                                    {/* {
                                        user === null ?
                                            <Avatar size="large" src={user.userData.picture} />
                                            :
                                            <Avatar size="large" icon={<UserOutlined />} />
                                    } */}
                                    <Avatar size="large" icon={user?.userData?.picture ? null : <UserOutlined />} src={user?.userData?.picture} />

                                </Dropdown>

                        }
                    </div>
                    <button className="navbar-toggler rounded-5 py-2 px-2" type="button" onClick={toggleDrawer} data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <LiaBarsSolid className="navbar-toggler-icon" style={{ fontSize: "14px" }} />
                    </button>
                </div>
            </nav>

            <Drawer
                title={
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='me-2'>
                            {/* <img src="" className='img-fluid' style={{ width: "170px", height: "auto" }} alt="Audio" /> */}
                            <img src={`${window.logo}`} className='img-fluid me-lg-5 me-auto' style={{ width: "170px", height: "auto" }} alt="Audio" />
                        </div>
                        {/* <div>
                            <Button type="primary" className={`px-3 custom-btn`} shape="round">Connect</Button>
                        </div> */}
                    </div>
                }
                placement="right"
                onClose={toggleDrawer}
                open={drawerVisible}
                bodyStyle={{ padding: 0 }}
                className='custom-drawer'
            >
                <div className='py-4'>
                    {/* {selectedItem && <Menu theme='dark' mode="inline" defaultSelectedKeys={[selectedItem]} className="">
                        {data.map((item) => (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                                onClick={() => {
                                    item.onClick && item.onClick();
                                    toggleDrawer(); // Close the drawer when a menu item is clicked
                                }}
                            >
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>} */}
                    {/* {selectedItem && <Menu theme='dark' mode="inline" items={items} defaultSelectedKeys={[selectedItem]} className={`dashboard ${theme}`} />} */}
                </div>
            </Drawer>

        </>
    )
}
