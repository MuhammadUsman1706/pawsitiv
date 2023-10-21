import React, { Fragment } from "react";
import JudgeList from "@/components/JudgesDirectory/JudgeList";
import Head from "next/head";
import { fetchJudgeList } from "../api";

const JudgesListPage = ({ fetchedJudges }) => {
  return (
    <Fragment>
      <Head>
        <title>Judges Directory</title>
      </Head>
      <JudgeList fetchedJudges={fetchedJudges} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const data = await fetchJudgeList();

  return { props: { fetchedJudges: data.judges }, revalidate: 10 };
};

export default JudgesListPage;
