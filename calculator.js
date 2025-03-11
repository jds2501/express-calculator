const express = require('express');

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

function mean(nums) {
    const sum = nums.reduce((acculumator, currentValue) => acculumator + currentValue);
    return sum / nums.length;
}

function median(nums) {

}

function mode(nums) {

}

function parseMathRequest(action, req, res) {
    try {
        const nums = parseNums(req.query["nums"]);
        return res.send({
            operation: mean.name,
            value: mean(nums)
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

app.listen(3000, () => {
    console.log("Running");
})