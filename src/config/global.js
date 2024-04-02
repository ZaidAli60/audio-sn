import { message } from "antd"
import logo from "assets/images/logo.png"

window.appName = process.env.REACT_APP_NAME
window.logo = logo


// window.logoColor = logoColor
// window.defaultDP = defaultDP

window.getRandomId = () => Math.random().toString(36).slice(2)
window.year = new Date().getFullYear()

// eslint-disable-next-line
window.isEmail = email => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);

window.toastify = (msg, type) => {

    switch (type) {
        case "success":
            message.success(msg)
            break;
        case "error":
            message.error(msg)
            break;
        case "warning":
            message.warning(msg)
            break;
        default:
            message.info(msg)
    }
}

window.getConfig = () => {
    const { token } = JSON.parse(localStorage.getItem("jwt"))
    const config = { headers: { Authorization: `Bearer ${token}` } }
    return config
}
