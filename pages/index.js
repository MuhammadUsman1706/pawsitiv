import { Fragment } from "react";
import Head from "next/head";
import Landing from "@/components/Landing/Landing";
import { fetchDogNames, fetchRecentResults, fetchStatistics } from "./api";

function LandingPage({ dogNames, statistics, recentResults }) {
  return (
    <Fragment>
      <Head>
        <title>Pawsitiv</title>
      </Head>
      <Landing
        dogNames={dogNames}
        statistics={statistics}
        recentResults={recentResults}
      />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const dogNamesData = fetchDogNames();
  const statisticsData = fetchStatistics();
  const recentResults = fetchRecentResults();

  const results = await Promise.all([
    dogNamesData,
    statisticsData,
    recentResults,
  ]);

  return {
    props: {
      dogNames: results[0].breeds,
      statistics: results[1],
      recentResults: results[2].event_result,
    },
    revalidate: 10,
  };
};

export default LandingPage;
