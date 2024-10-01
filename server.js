const express = require("express");
const payload = require("payload");

require("dotenv").config();
const app = express();

const start = async () => {
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: app,
    });

    app.listen(process.env.PORT || 8080, async () => {
        console.log(
            "Express is now listening for incoming connections on port 8080."
        );
    });
};

start();
