//DB
const mongoose = require("mongoose");
mongoose
    .connect(process.env.DB, {
        // useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(console.log("db connected"))
    .catch();
