const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const nums = req.query["nums"];

    if (!nums) {
        res.statusCode = 400;
        return res.send({
            error: "nums are required"
        });
    }

    return res.send({
        operation: "mean",
        value: 4
    });
})

app.listen(3000, () => {
    console.log("Running");
})