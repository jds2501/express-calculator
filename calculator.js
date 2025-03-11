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

module.exports = { mean, median, mode };