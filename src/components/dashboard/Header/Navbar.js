import React, { useState } from "react";
import { useAuthContext } from "context/AuthContext";
import { Link } from "react-router-dom";
// import avatar from "assets/images/avatar.png"


export default function Navbar() {

  const { handleLogout, user } = useAuthContext();
  const [messages, setMessages] = useState([]);

  return (
    <>
      {/* <div>
        <audio ref={messageSound} src={audioSound} autoplay muted></audio>
      </div> */}
      <header className="position-sticky top-0" style={{ zIndex: 100 }}>
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
          <div className="container-fluid">
            <img src={window.logoDark} className='img-fluid me-lg-5 me-auto' style={{ width: "130px", height: "auto", cursor: "pointer" }} alt={`${window.appName} Logo`} />
            <div className="d-flex">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item dropdown me-3">
                    <button className="nav-link dropdown-toggle border-0 bg-transparent d-flex align-items-center p-0" data-bs-toggle="dropdown">
                      <span className="text-white d-inline-block me-2 text-end">
                        <small className="fw-bold">{user.fullName}</small>
                        {/* <small>Super Admin</small> */}
                      </span>
                      {/* <img src={avatar} alt="Profile Pic" className="rounded-circle" /> */}
                      {
                        !user?.photo ?
                          <img src="" className='rounded-circle ' alt='Profile Pic' />
                          :
                          <img src={user.photo.url} alt="Profile Pic" className='rounded-circle' />
                      }
                    </button>
                    <ul className="dropdown-menu pb-0">
                      <li><Link to="/dashboard/settings/profile" className="dropdown-item"><i className="fa-regular fa-user"></i>My Profile</Link></li>
                      <li><Link to="/dashboard/settings/account" className="dropdown-item"><i className="fa-solid fa-gears"></i>Account Settings</Link></li>
                      <li><button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </li>
                  <li className="nav-item"><Link to="/dashboard/messages" className="nav-link"><i className="fa-regular fa-envelope position-relative" >
                    {messages.length === 0 ? "" :
                      (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info" style={{ fontSize: "12px" }}>
                          {messages.length}
                        </span>
                      )
                    }

                  </i></Link></li>
                  <li className="nav-item"><Link to="/dashboard/notifications" className="nav-link"><i className="fa-regular fa-bell"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
