
const info = (message = '', loggerData = {}) => {
    console.log(message, loggerData);
}

const error = (message = '', loggerData = {}) => {
    console.error(message, loggerData);
}
module.exports = {
    info,
    error
}