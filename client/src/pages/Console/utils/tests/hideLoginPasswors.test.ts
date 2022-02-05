import React, { MutableRefObject } from "react";
import { hideLoginPassword } from "../hideLoginPassword";

test("Check password is hidden for login function", () => {
  const inputText = "login username 12345678";

  const useRefSpy = jest.spyOn(React, "useRef").mockReturnValueOnce({ current: "" });
  const check = hideLoginPassword(inputText, useRefSpy as any);

  expect(check).toEqual("login username ********");
});
