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
    const sortedNums = nums.sort((a, b) => a - b);

    let result;
    const midIndex = sortedNums.length / 2;

    if (nums % 2 === 0) {
        result = (sortedNums[midIndex - 1] + sortedNums[midIndex]) / 2;
    } else {
        result = sortedNums[Math.floor(midIndex)];
    }

    return result;
}

function mode(nums) {

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

app.listen(3000, () => {
    console.log("Running");
})