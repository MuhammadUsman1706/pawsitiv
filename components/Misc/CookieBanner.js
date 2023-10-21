import React from "react";
import Link from "next/link";
import CookieBanner, { Cookies } from "react-cookie-banner";

import classes from "./CookieBanner.module.css";

const CookieBannerWarning = () => {
  const cookies = new Cookies();

  return (
    <CookieBanner
      dismissOnScroll={false}
      dismissOnClick={false}
      onAccept={() => {}}
    >
      {(onAccept) => (
        <div className={classes.banner}>
          <img src="/images/cookie.png" alt="cookie" />
          <span className={classes.message}>
            Pawsitiv uses cookies to guarantee users the employment of its site
            features, offering a better purchasing experience. By continuing to
            browse the site you're agreeing to our use of cookies." &nbsp;
            <Link href="/privacy-policy">
              More information on our use of cookies
            </Link>
          </span>
          <div className={classes.buttons}>
            <button onClick={onAccept} className={classes.button}>
              Accept
            </button>
            <button className={classes.button}>Reject</button>
          </div>
        </div>
      )}
    </CookieBanner>
  );
};

export default CookieBannerWarning;
