import React, { Fragment } from "react";
import Head from "next/head";
import BreedDB from "@/components/BreedDB/BreedDB";
import { fetchBreedList } from "../api";

const DogDatabasePage = ({ fetchedData }) => {

  return (
    <Fragment>
      <Head>
        <title>Dog Database</title>
      </Head>
      <BreedDB fetchedData={fetchedData} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const data = await fetchBreedList();

  return { props: { fetchedData: data.breeds }, revalidate: 10 };
}

export default DogDatabasePage;
