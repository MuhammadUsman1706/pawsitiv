import React, { Fragment } from "react";
import Head from "next/head";
import ClubDetails from "@/components/ClubDirectory/ClubDetails";
import { fetchClubDetails, fetchClubList } from "@/pages/api";

export default function ClubDetailPage({ clubData, clubDetail }) {
  return (
    <Fragment>
      <Head>
        <title>{clubDetail?.clubs_name} | Club Directory</title>
      </Head>
      <ClubDetails clubData={clubData} clubDetail={clubDetail} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { clubName: "Asociación Canina Nicaraguense", clubId: "58" } },
      {
        params: { clubName: "Asociación Canófila Costarricense", clubId: "18" },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = await fetchClubDetails(context.params.clubId);
  const clubList = await fetchClubList();

  delete data.club.email;

  return {
    props: {
      clubDetail: data.club,
      clubData: clubList.club,
    },
    revalidate: 10,
  };
}
