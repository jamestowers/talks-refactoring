import React from "react";
import Cookies from "universal-cookie";
import { DateTime } from "luxon";
import { shallow } from "enzyme";

import CookieBanner from "./";

const cookieOptions = {
  path: "/",
  expires: DateTime.local()
    .plus({ years: 10 })
    .toJSDate()
};

describe("CookieBanner component", () => {
  it("can mount", () => {
    const wrapper = shallow(<CookieBanner />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("does show if the accepted cookie has not been dropped", () => {
    const cookies = new Cookies();
    cookies.remove("has-accepted-cookies");

    const wrapper = shallow(<CookieBanner />);

    expect(wrapper.state().hidden).toBeFalsy();
  });

  it("does not show once the accepted cookie has been dropped", () => {
    const cookies = new Cookies();
    cookies.remove("has-accepted-cookies");

    cookies.set("has-accepted-cookies", "true", cookieOptions);

    const wrapper = shallow(<CookieBanner />);

    expect(wrapper.state().hidden).toBeTruthy();
  });

  it("does not show if the accepted cookie has been dropped but less than 90 days has passed since last user pageview", () => {
    const cookies = new Cookies();
    cookies.remove("has-accepted-cookies");

    cookies.set("has-accepted-cookies", "true", cookieOptions);

    cookies.set(
      "user-last-visit",
      DateTime.local()
        .minus({ days: 89 })
        .toJSDate(),
      cookieOptions
    );

    const wrapper = shallow(<CookieBanner />);

    expect(wrapper.state().hidden).toBeTruthy();
  });

  it("does show if the accepted cookie has been dropped but more than 90 days has passed since last user pageview", () => {
    const cookies = new Cookies();
    cookies.remove("has-accepted-cookies");

    cookies.set("has-accepted-cookies", "true", cookieOptions);

    cookies.set(
      "user-last-visit",
      DateTime.local()
        .minus({ days: 91 })
        .toJSDate(),
      cookieOptions
    );

    const wrapper = shallow(<CookieBanner />);

    expect(wrapper.state().hidden).toBeFalsy();
  });
});
