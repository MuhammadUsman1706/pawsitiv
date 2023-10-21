import React, { Fragment } from "react";
import Head from "next/head";
import ProfileDetails from "@/components/BreedDB/BreedDBElements/ProfileDetails/ProfileDetails";
import { fetchBreedProfile } from "@/pages/api";
import ConstructionIcon from "@mui/icons-material/Construction";

const ProfileDetailsPage = ({ profileData }) => {
  return (
    <Fragment>
      <Head>
        <title>{profileData?.dogs_name}</title>
      </Head>
      <ProfileDetails profileData={profileData} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { profileName: "-Afrodite", profileId: "469106" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const data = await fetchBreedProfile(context.params.profileId);

  return { props: { profileData: data.dog[0] }, revalidate: 10 };
}

// const ProfileDetailsPage = () => {
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

export default ProfileDetailsPage;
