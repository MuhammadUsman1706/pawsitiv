import React, { Fragment } from "react";
import Head from "next/head";
import Club from "@/components/ClubDirectory/Club";
import { fetchClubList } from "../api";

export default function ClubDirectoryPage({ clubData }) {
  return (
    <Fragment>
      <Head>
        <title>Club Directory</title>
      </Head>
      <Club clubData={clubData} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const data = await fetchClubList();
  return { props: { clubData: data.club }, revalidate: 10 };
}
