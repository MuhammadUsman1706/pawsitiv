import React, { Fragment } from "react";
import Head from "next/head";
import AllResults from "@/components/Results/AllResults";

const ResultsPage = ({ fetchedData }) => {
  return (
    <Fragment>
      <Head>
        <title>
          {fetchedData?.details?.event}{" "}
          {new Date(fetchedData?.details?.start_date).getFullYear()} |{" "}
          {fetchedData?.details?.club}
        </title>
      </Head>
      <AllResults fetchedData={fetchedData} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { eventName: "runing", eventId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = {
    details: {
      start_date: "2023-03-13",
      event: "runing",
      club: "Federación Cinológica Argentina",
      country: "Pakistan",
      city: "Karachi",
      eventId: 1,
    },
    bestInGroup: [
      {
        dogName: "example",
        breed: "example",
        awards: "Best in Group",
        owner: "example",
        dogId: "example",
      },
    ],
    bestInShow: [
      {
        dogName: "example",
        breed: "example",
        awards: "Best in Show",
        owner: "example",
        dogId: "example",
      },
      {
        dogName: "Dragon Asarko Lordana",
        breed: "Bulldog",
        awards: "Best in Show",
        owner: "example",
        dogId: 366642,
      },
      {
        dogName: "Dragon Asarko Lordana",
        breed: "Bulldog",
        awards: "Best in Show",
        owner: "example",
        dogId: 366642,
      },
    ],
    breedData: {
      german_shepherd: {
        baby: {
          male: [
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Asarko Lordana",
              awards: "Best in Show",
              class: "baby",
              dogId: 366642,
            },
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Asarko Lordana",
              awards: "Best in Show",
              class: "baby",
              dogId: 366642,
            },
          ],
        },
        intermediate: {
          male: [
            {
              grading: "gg",
              place: "Karachi",
              dogName: "intermediate Asarko Lordana",
              awards: "Best in Show",
              class: "intermediate",
              dogId: 366642,
            },
            {
              grading: "gg",
              place: "Karachi",
              dogName: "intermediate Asarko Lordana",
              awards: "Best in Show",
              class: "intermediate",
              dogId: 366642,
            },
          ],
        },
      },
      akita: {
        open: {
          male: [
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Akita Lordana",
              awards: "Best in Show",
              class: "open",
              dogId: 366642,
            },
            {
              grading: "gg",
              place: "Karachi",
              dogName: "Dragon Akita Lordana",
              awards: "Best in Show",
              class: "open",
              dogId: 366642,
            },
          ],
        },
      },
    },
  };

  return { props: { fetchedData: data }, revalidate: 10 };
}

export default ResultsPage;
