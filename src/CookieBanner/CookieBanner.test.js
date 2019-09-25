import React from "react";
import Cookies from "universal-cookie";
import { DateTime } from "luxon";

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
  describe("when no cookies are set", () => {
    it("is displayed", () => {
      cookies.remove("has-accepted-cookies");

      const { getByTestId } = render(<CookieBanner />);
      getByTestId("cookie-banner");
    });

    it("hides when cookies are accepted", () => {
      cookies.remove("has-accepted-cookies");

      const { queryByTestId, getByText } = render(<CookieBanner />);
      fireEvent(
        getByText("Got it"),
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true
        })
      );
      expect(queryByTestId("cookie-banner")).toBeNull();
    });
  });

  describe("when cookies have been accepted", () => {
    it("is not displayed", () => {
      cookies.set("has-accepted-cookies", "true", cookieOptions);

      const { queryByTestId } = render(<CookieBanner />);
      expect(queryByTestId("cookie-banner")).toBeNull();
    });

    it("is displayed if 90 days have passed since they were accepted", () => {
      cookies.set("has-accepted-cookies", "true", cookieOptions);
      cookies.set(
        "user-last-visit",
        DateTime.local()
          .minus({ days: 91 })
          .toJSDate(),
        cookieOptions
      );

      const { getByTestId } = render(<CookieBanner />);
      getByTestId("cookie-banner");
    });
  });
});
