import React, { Fragment } from "react";
import Head from "next/head";
import BreedDB from "@/components/BreedDB/BreedDB";
import { fetchBreedProfiles } from "../../api";
import ConstructionIcon from "@mui/icons-material/Construction";

const BreedProfilesPage = ({ fetchedData }) => {
  return (
    <Fragment>
      <Head>
        <title>Breed Profiles</title>
      </Head>
      <BreedDB profiles={true} fetchedData={fetchedData} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { breedName: "German Shepherd Dog", breedId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = await fetchBreedProfiles(context.params.breedId);

  return { props: { fetchedData: data.dog }, revalidate: 10 };
}

// const BreedProfilesPage = () => {
//   return (
//     <Fragment>
//       <Head>
//         <title>Under Construction</title>
//       </Head>
//       <h1
//         style={{
//           margin: "20% auto",
//           textAlign: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           columnGap: "1rem",
//         }}
//       >
//         <span
//           style={{ fontSize: "40px", display: "flex", alignItems: "center" }}
//         >
//           <ConstructionIcon fontSize="inherit" />
//         </span>
//         Page Under Construction, please bear with us!
//       </h1>
//     </Fragment>
//   );
// };

export default BreedProfilesPage;
