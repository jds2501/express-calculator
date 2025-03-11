function mean(nums) {
    let result;

    if (nums.length > 0) {
        const sum = nums.reduce((acculumator, currentValue) => acculumator + currentValue);
        result = sum / nums.length;
    } else {
        result = 0;
    }

    return result;
}

function median(nums) {
    const sortedNums = nums.sort((a, b) => a - b);

    let result;
    const midIndex = sortedNums.length / 2;

    if (nums.length % 2 === 0) {
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

    let highestValues = [];
    let highestCount = null;

    for (const [num, count] of numMap) {
        if (count > 1) {
            if (highestValues === null || count > highestCount) {
                highestValues = [num];
                highestCount = count;
            } else if (count === highestCount) {
                highestValues.push(num);
            }
        }
    }

    return highestValues;
}

module.exports = { mean, median, mode };