import React, { Fragment } from "react";
import Head from "next/head";
import ShowResults from "@/components/Results/ShowResults";
import { fetchClubNames, fetchCountryNames, fetchDogNames } from "../../api";
import { useRouter } from "next/router";

const ShowResultsPage = ({ breeds, countries, clubs }) => {
  const { breedName } = useRouter().query;
  return (
    <Fragment>
      <Head>
        <title>{breedName}</title>
      </Head>
      <ShowResults breeds={breeds} countries={countries} clubs={clubs} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { breedName: "Affenpinscher", breedId: "33" } }],
    fallback: "blocking",
  };
}

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
