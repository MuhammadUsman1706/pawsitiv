import React, { Fragment } from "react";
import Head from "next/head";
import BreedDetail from "@/components/BreedInfo/BreedDetail";
import { fetchBreedDetail, fetchBreedList } from "../../api";

const BreedDetailPage = ({ breedListData, fetchedData }) => {
  return (
    <Fragment>
      <Head>
        <title>{fetchedData?.breed.breed_name}</title>
      </Head>
      <BreedDetail
        breedListData={breedListData}
        fetchedData={fetchedData}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { breedName: "German Shepherd Dog", breedId: "1" } },
      { params: { breedName: "Bulldog", breedId: "5" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const breedData = await fetchBreedList();
  const data = await fetchBreedDetail(context.params.breedId);
  return {
    props:
    {
      breedListData: breedData.breeds,
      fetchedData: data,
    },
    revalidate: 10
  };
}

export default BreedDetailPage;
