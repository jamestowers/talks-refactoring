import React from "react";
import Cookies from "universal-cookie";
import { DateTime } from "luxon";

import {
  CookieBannerStyled,
  CookieBannerTextStyled,
  CookieBannerCloseStyled,
  CookieBannerButtonsStyled
} from "./styles";

const longExpiry = DateTime.local()
  .plus({ years: 10 })
  .toJSDate();

class CookieBanner extends React.Component {
  state = {
    hidden: true
  };

  componentDidMount() {
    const cookies = new Cookies();
    const accepted = cookies.get("has-accepted-cookies");
    console.log(window.document);

    // banner hidden by default
    // if not accepted, show the banner

    if (accepted !== "true") {
      this.setState({
        hidden: false
      });
    }

    let userLastVisit = cookies.get("user-last-visit");

    // if we have a user last visit date, check that they have visited within
    // the last 90 days

    if (userLastVisit) {
      userLastVisit = DateTime.fromISO(userLastVisit);
      const currentDate = DateTime.local();
      const diffInDays = currentDate.diff(userLastVisit, "days").toObject()
        .days;

      // if they haven't visited within the last 90 days, set the 'accepted'
      // cookie to false and show the banner

      if (diffInDays > 90) {
        cookies.set("has-accepted-cookies", "false", {
          path: "/",
          expires: longExpiry
        });

        this.setState({
          hidden: false
        });
      }
    }

    // record the user's last visit

    cookies.set("user-last-visit", DateTime.local().toJSDate(), {
      path: "/",
      expires: longExpiry
    });
  }

  handleAccept = () => {
    const cookies = new Cookies();

    cookies.set("has-accepted-cookies", "true", {
      path: "/",
      expires: longExpiry
    });

    this.setState({
      hidden: true
    });
  };

  render() {
    return (
      !this.state.hidden && (
        <CookieBannerStyled data-testid="cookie-banner">
          <CookieBannerTextStyled>
            <p>
              This website uses cookies. By continuing to browse the site you
              are agreeing to our use of cookies.
            </p>
          </CookieBannerTextStyled>
          <CookieBannerButtonsStyled>
            <a href="/cookies">
              <button>Learn More</button>
            </a>

            <button onClick={this.handleAccept}>Got it</button>
          </CookieBannerButtonsStyled>
          <CookieBannerCloseStyled onClick={this.handleAccept}>
            x
          </CookieBannerCloseStyled>
        </CookieBannerStyled>
      )
    );
  }
}

export default CookieBanner;
