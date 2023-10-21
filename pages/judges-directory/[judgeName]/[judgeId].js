import React, { Fragment } from "react";
import Head from "next/head";
import JudgeDetails from "@/components/JudgesDirectory/JudgeDetails";
import { fetchJudgeDetail, fetchJudgeList } from "@/pages/api";

const JudgeDetailPage = ({ fetchedJudges, judgeDetail }) => {
  return (
    <Fragment>
      <Head>
        <title>{judgeDetail?.full_name} | Judge Profile</title>
      </Head>
      <JudgeDetails fetchedJudges={fetchedJudges} judgeDetail={judgeDetail} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { judgeName: "Dr. György Tesics", judgeId: "69" } },
      { params: { judgeName: "Nicola Imbimbo", judgeId: "70" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = await fetchJudgeDetail(context.params.judgeId);
  const judgesList = await fetchJudgeList();

  return {
    props: {
      judgeDetail: data.judge,
      fetchedJudges: judgesList.judges,
    },
    revalidate: 10,
  };
}

export default JudgeDetailPage;
