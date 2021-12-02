import { expect, it } from "@jest/globals";
import { data_example } from "../day1/data_example.js";
import { data } from "../day1/data.js";
import { countIncreases } from "../day1/app.js";

it('Should count correctly position', () => {
    const res = countIncreases(data_example, 1);
    expect(res).toEqual(7);
});

it('Should count correctly position for a long array', () => {
    const res = countIncreases(data, 1);
    expect(res).toEqual(1832);
});

it('Should count correctly aimed position', () => {
    const res = countIncreases(data_example, 3);
    expect(res).toEqual(5);
});