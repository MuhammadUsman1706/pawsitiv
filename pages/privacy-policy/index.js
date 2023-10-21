import React, { Fragment } from "react";
import Head from "next/head";
import PrivacyPolicy from "@/components/Misc/PrivacyPolicy";

const PrivacyPolicyPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <PrivacyPolicy />
    </Fragment>
  );
};

export default PrivacyPolicyPage;
