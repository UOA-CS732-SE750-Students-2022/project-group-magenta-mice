import React from "react";
import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";

import Index from "../pages/index";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/image", () => ({
  __esModule: true,
  default: () => {
    return "Next image stub"; // whatever
  },
}));

describe("Index", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("should render successfully", () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
