import { expect, it } from "@jest/globals";
import { data_example } from "../day2/data_example.js";
import { data } from "../day2/data.js";
import { findAimedPosition, findPosition } from "../day2/app.js";

it('Should count correctly position', () => {
    const res = findPosition(data_example);
    expect(res).toEqual(150);
});

it('Should count correctly position for a long array', () => {
    const res = findPosition(data);
    expect(res).toEqual(2215080);
});

it('Should count correctly aimed position', () => {
    const res = findAimedPosition(data_example);
    expect(res).toEqual(900);
});

// it('Should count correctly aimed position for a long array', () => {
//     const res = findAimedPosition(data_example);
//     expect(res).toEqual();
// });