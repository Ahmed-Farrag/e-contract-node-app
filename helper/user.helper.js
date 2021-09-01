const fs = require("fs")
const resCreator = (status, data, message) => {
    return {
        apiStatus: status,
        data,
        message
    }
}
activityLog = null
const readData = () => {
    try {
        activityLog = JSON.parse(fs.readFileSync("activityLog.json").toString());
        if (!Array.isArray(activityLog)) throw new Error("");
    } catch (e) {
        activityLog = [];
    }
};
const writeData = () => {
    fs.writeFileSync("activityLog.json", JSON.stringify(activityLog));
};
const updateActivityLog = (activity, userId, createdAt) => {
    readData();
    activityLog.push({ activity, userId, createdAt });
    writeData();
};
module.exports = { resCreator, readData, writeData, updateActivityLog }
