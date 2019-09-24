import React from "react";
import Cookies from "universal-cookie";
import { DateTime } from "luxon";

import {
  CookieBannerStyled,
  CookieBannerTextStyled,
  CookieBannerCloseStyled,
  CookieBannerButtonsStyled
} from "./styles";

const cookieExpiryTime = DateTime.local()
  .plus({ years: 10 })
  .toJSDate();

const cookieValidityPeriod = 90;

class CookieBanner extends React.Component {
  state = {
    show: false
  };

  cookies = new Cookies();

  componentDidMount() {
    if (this.hasUserNotAcceptedCookie()) {
      this.showBanner();
    }

    if (this.hasCookieExpired()) {
      this.setCookie("has-accepted-cookies", "false");
      this.showBanner();
    }
    this.setCookie("user-last-visit", DateTime.local().toJSDate());
  }

  handleAccept = () => {
    this.setCookie("has-accepted-cookies", "true");
    this.showBanner(false);
  };

  hasUserNotAcceptedCookie = () => {
    const hasUserAccepted = this.cookies.get("has-accepted-cookies");
    return hasUserAccepted !== "true";
  };

  getUserLastVisitTime = () => {
    const userLastVisitTime = this.cookies.get("user-last-visit");
    return DateTime.fromISO(userLastVisitTime);
  };

  hasCookieExpired = () => {
    const userLastVisitTime = this.getUserLastVisitTime();
    const currentDate = DateTime.local();
    const daysSinceUserLastVisit = currentDate
      .diff(userLastVisitTime, "days")
      .toObject().days;

    return daysSinceUserLastVisit > cookieValidityPeriod;
  };

  showBanner = (shouldShow = true) =>
    this.setState({
      show: shouldShow
    });

  setCookie = (cookieName, value) => {
    const cookies = new Cookies();
    return cookies.set(cookieName, value, {
      path: "/",
      expires: cookieExpiryTime
    });
  };

  render() {
    return (
      this.state.show && (
        <CookieBannerStyled>
          <CookieBannerTextStyled>
            <small>
              This website uses cookies. By continuing to browse the site you
              are agreeing to our use of cookies.
            </small>
          </CookieBannerTextStyled>
          <CookieBannerButtonsStyled>
            <a href="/cookies">
              <button>Learn More</button>
            </a>

            <button onClick={this.handleAccept}>Got it</button>
          </CookieBannerButtonsStyled>
          <CookieBannerCloseStyled onClick={this.handleAccept}>
            X
          </CookieBannerCloseStyled>
        </CookieBannerStyled>
      )
    );
  }
}

export default CookieBanner;
