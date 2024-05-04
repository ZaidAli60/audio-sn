export default function formatTime(time) {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    let formattedTime = ''
    if (hours > 0) {
        formattedTime += `${hours < 10 ? '0' : ''}${hours}:`
    }
    formattedTime += `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    return formattedTime // hh:mm:ss || mm:ss
}
