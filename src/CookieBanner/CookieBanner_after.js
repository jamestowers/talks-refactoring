import React from "./node_modules/react";
import UIKIT from "./node_modules/immersive-labs-ui-kit";
import Cookies from "./node_modules/universal-cookie";
import { Link } from "./node_modules/react-router";
import { DateTime } from "./node_modules/luxon";
import { FontAwesomeIcon } from "./node_modules/@fortawesome/react-fontawesome";

import mixins from "./node_modules/utils/styles/mixins";
import { resolveRoute } from "./node_modules/utils/URL";
import { ROUTES } from "./node_modules/constants/routes";

import {
  CookieBannerStyled,
  CookieBannerTextStyled,
  CookieBannerCloseStyled,
  CookieBannerButtonsStyled
} from "./styles";

const COOKIE_TIME_TO_LIVE = 90;

const COOKIE_EXPIRY_TIME = DateTime.local()
  .plus({ years: 10 })
  .toJSDate();

class CookieBanner extends React.Component {
  state = {
    show: false
  };
  cookies = new Cookies();

  componentDidMount() {
    if (this.hasUserNotAccepted() || this.hasCookieExpired()) {
      this.showBanner();
    }

    if (this.hasCookieExpired()) {
      this.setCookie("has-accepted-cookies", false);
    }

    this.setCookie("user-last-visit", DateTime.local().toJSDate());
  }

  hasUserNotAccepted = () => {
    const hasUserAccepted = Boolean(this.cookies.get("has-accepted-cookies"));
    return hasUserAccepted === false;
  };

  daysSinceLastVisit = userLastVisitTime => {
    const userLastVisit = DateTime.fromISO(userLastVisitTime);
    const currentDate = DateTime.local();
    return currentDate.diff(userLastVisit, "days").toObject().days;
  };

  hasCookieExpired = () => {
    const userLastVisit = this.cookies.get("user-last-visit");
    if (!userLastVisit) return;
    if (this.daysSinceLastVisit(userLastVisit) > COOKIE_TIME_TO_LIVE) {
      return true;
    }
    return false;
  };

  setCookie = (name, value = true) =>
    this.cookies.set(name, value, {
      path: "/",
      expires: COOKIE_EXPIRY_TIME
    });

  showBanner = (shouldShow = true) =>
    this.setState({
      show: shouldShow
    });

  handleAccept = () => {
    this.setCookie("has-accepted-cookies", "true");
    this.showBanner(false);
  };

  render() {
    return (
      this.state.show && (
        <CookieBannerStyled>
          <CookieBannerTextStyled>
            <FontAwesomeIcon
              icon={["far", "info-circle"]}
              color={mixins.getThemeColor("white")}
            />
            <UIKIT.Small white bold inlineBlock>
              This website uses cookies. By continuing to browse the site you
              are agreeing to our use of cookies.
            </UIKIT.Small>
          </CookieBannerTextStyled>
          <CookieBannerButtonsStyled>
            <Link
              to={resolveRoute(ROUTES.TERMS_AND_CONDITIONS, {
                policyType: "cookies"
              })}
            >
              <UIKIT.Button
                small
                white
                margin={[0, 0, 0, 1.5]}
                text="Learn More"
              />
            </Link>

            <UIKIT.Button
              small
              white
              margin={[0, 0, 0, 0.5]}
              onClick={this.handleAccept}
              text="Got it"
              data-qaid="cookie-accept"
            />
          </CookieBannerButtonsStyled>
          <CookieBannerCloseStyled onClick={this.handleAccept}>
            <FontAwesomeIcon
              icon={["fal", "times"]}
              color={mixins.getThemeColor("white")}
            />
          </CookieBannerCloseStyled>
        </CookieBannerStyled>
      )
    );
  }
}

export default CookieBanner;
