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

app.get('/', (req, res) => {
    let nums;

    try {
        nums = parseNums(req.query["nums"]);
        return res.send({
            operation: "mean",
            value: nums
        });
    } catch (err) {
        res.statusCode = 400;
        return res.send({
            error: err.message
        });
    }
})

app.listen(3000, () => {
    console.log("Running");
})