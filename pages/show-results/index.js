import React, { Fragment } from "react";
import { fetchCountryNames, fetchDogNames, fetchClubNames } from "../api";

import ShowResults from "@/components/Results/ShowResults";
import Head from "next/head";

const ShowResultsPage = ({ breeds, countries, clubs }) => {
  return (
    <Fragment>
      <Head>
        <title>Show Results</title>
      </Head>
      <ShowResults breeds={breeds} countries={countries} clubs={clubs} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const breedsData = fetchDogNames();
  const countriesData = fetchCountryNames();
  const clubData = fetchClubNames();

  const responses = await Promise.all([breedsData, countriesData, clubData]);

  return {
    props: {
      breeds: responses[0].breeds,
      countries: responses[1].countries,
      clubs: responses[2].club,
    },
    revalidate: 10,
  };
};

export default ShowResultsPage;
