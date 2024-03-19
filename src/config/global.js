import { message } from "antd"
import logo from "assets/images/logo.svg"

window.appName = process.env.REACT_APP_NAME
window.logo = logo


// window.logoColor = logoColor
// window.defaultDP = defaultDP

window.getRandomId = () => Math.random().toString(36).slice(2)
window.year = new Date().getFullYear()


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
