const sum = require("./sum");

test("add 5 + 2 to equal 7", () => {
  const r = sum(5, 2);
  expect(r).toBe(7);
});

// describe("Create user", () => {
//   it("adds 5 + 2 to equal 7", () => {
//     expect(sum(5, 2)).toBe(7);
//   });
// });
