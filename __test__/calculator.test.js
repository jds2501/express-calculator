const { mean, median, mode } = require("../calculator.js");

describe('calculator', () => {
    it('mean', async () => {
        expect(mean([1])).toBe(1);
        expect(mean([1, 2])).toBe(1.5);
        expect(mean([1, 2, 3])).toBe(2);
    });

    it('median', async () => {
        expect(median([1])).toBe(1);
        expect(median([1, 2])).toBe(1.5);
        expect(median([3, 2, 1])).toBe(2);
        expect(median([4, 1, 3, 2])).toBe(2.5);
    });

    it('mode', async () => {
        expect(mode([1])).toStrictEqual([]);
        expect(mode([1, 1])).toStrictEqual([1]);
        expect(mode([1, 1, 2])).toStrictEqual([1]);
        expect(mode([2, 1, 1, 2])).toStrictEqual([2, 1]);
    });
});

