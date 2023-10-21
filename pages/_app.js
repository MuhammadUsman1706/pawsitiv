import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";
import { ToastContainer } from "react-toastify";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
const CookieBannerWarning = dynamic(
  () => import("../components/Misc/CookieBanner"),
  {
    ssr: false,
  }
);
const Loading = dynamic(() => import("../components/Misc/Loading"), {
  ssr: false,
});

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Navbar />
      <Loading />
      <GoogleReCaptchaProvider
        useEnterprise
        reCaptchaKey="6LdaqR8mAAAAAKFPJP6iZAPsVVbPrubjYcVRSHIP"
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
      <Footer />
      <CookieBannerWarning />
      <ToastContainer />
    </Fragment>
  );
}
