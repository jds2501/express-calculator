const express = require('express');
const { mean, median, mode } = require("./calculator.js");

const app = express();

function parseNums(numsParam) {
    if (!numsParam) {
        throw new Error("nums are required");
    }

    const splitNums = numsParam.split(",");
    const retNums = [];

    for (let index = 0; index < splitNums.length; index++) {
        const splitNum = splitNums[index];

        if (isNaN(splitNum)) {
            throw new Error(`${splitNum} is not a number.`);
        }

        retNums.push(Number(splitNum));
    }

    return retNums;
}

function parseMathRequest(action, req, res) {
    try {
        const nums = parseNums(req.query["nums"]);
        return res.send({
            operation: action.name,
            value: action(nums)
        });
    } catch (err) {
        res.statusCode = 400;
        return res.send({
            error: err.message
        });
    }
}

app.get('/mean', (req, res) => {
    return parseMathRequest(mean, req, res);
})

app.get('/median', (req, res) => {
    return parseMathRequest(median, req, res);
})

app.get('/mode', (req, res) => {
    return parseMathRequest(mode, req, res);
})

app.listen(3000, () => {
    console.log("Running");
})