import isDev from "../isDev";

test("isDev returns Boolean", () => {
  const devTest = isDev();
  expect(typeof devTest === "boolean").toBeTruthy();
});
