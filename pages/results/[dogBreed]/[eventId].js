import React, { Fragment } from "react";
import Results from "@/components/Results/Results";
import { fetchEventDetails } from "@/pages/api";
import Head from "next/head";

const ResultsPage = ({ fetchedData }) => {
  return (
    <Fragment>
      <Head>
        <title>
          {fetchedData?.details?.event}{" "}
          {new Date(fetchedData?.details?.start_date).getFullYear()} |{" "}
          {fetchedData?.details?.club} {fetchedData?.details?.breedName}
        </title>
      </Head>
      <Results fetchedData={fetchedData} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { dogBreed: "Affenpinscher", eventId: "1" } },
      { params: { dogBreed: "Bulldog", eventId: "5" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = await fetchEventDetails(context.params.eventId);

  return { props: { fetchedData: data }, revalidate: 10 };
}

export default ResultsPage;
