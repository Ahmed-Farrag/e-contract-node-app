const resCreator = (status, data, message) => {
    return {
        apiStatus: status,
        data,
        message
    }
}

module.exports = resCreator
