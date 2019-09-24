import Cookies from "universal-cookie";
import { DateTime } from "luxon";

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import CookieBanner from "./";

const cookies = new Cookies();

const cookieOptions = {
  path: "/",
  expires: DateTime.local()
    .plus({ years: 10 })
    .toJSDate()
};

describe("CookieBanner component", () => {
  it("is displayed if no coookies are set", () => {
    cookies.remove("has-accepted-cookies");

    const { getByTestId } = render(<CookieBanner />);
    // debug();
    expect(getByTestId("cookie-banner"));
  });

  it("is not displayed if user has accepted cookies", () => {
    cookies.set("has-accepted-cookies", "true", cookieOptions);
    console.log(cookies.get("has-accepted-cookies"));

    const { getByTestId, debug } = render(<CookieBanner />);
    debug();
    expect(getByTestId("cookie-banner"));
  });
});
