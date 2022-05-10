import React from "react";
import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Exchange from "../pages/exchange";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    return "Next image stub"; // whatever
  },
}));

describe("Exchange", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/exchange");
  });

  it("should render successfully", () => {
    const { baseElement } = render(<Exchange />);
    expect(baseElement).toBeTruthy();
  });
});
