import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import BreedList from "@/components/BreedInfo/BreedList";
import { fetchBreedList } from "../api";

const BreedListPage = ({ fetchedData }) => {



  return (
    <Fragment>
      <Head>
        <title>Breed List</title>
      </Head>
      <BreedList fetchedData={fetchedData} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const data = await fetchBreedList();
  return { props: { fetchedData: data.breeds }, revalidate: 10 };
}

export default BreedListPage;
