import logo from "assets/images/logo.svg"

window.appName = process.env.REACT_APP_NAME
window.logo = logo


// window.logoColor = logoColor
// window.defaultDP = defaultDP

window.getRandomId = () => Math.random().toString(36).slice(2)
window.year = new Date().getFullYear()
