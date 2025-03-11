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
    const numMap = new Map();

    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        if (numMap.has(num)) {
            numMap.set(num, numMap.get(num) + 1);
        } else {
            numMap.set(num, 1);
        }
    }

    let highestValue = null;
    let highestCount = null;

    for (const [num, count] of numMap) {
        if (highestValue === null || count > highestCount) {
            highestValue = num;
            highestCount = count;
        }
    }

    return highestValue;
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