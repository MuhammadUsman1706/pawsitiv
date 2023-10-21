import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicData from "./ProfileDetailsElements/BasicData";
import Pedigree from "./ProfileDetailsElements/Pedigree";
import ShowResults from "./ProfileDetailsElements/ShowResults";
import Siblings from "./ProfileDetailsElements/Siblings";
import Progeny from "./ProfileDetailsElements/Progeny";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PetsIcon from "@mui/icons-material/Pets";
import LockIcon from "@mui/icons-material/Lock";
import MaleIcon from "@mui/icons-material/Male";

import classes from "./ProfileDetails.module.css";
import { CircularProgress } from "@mui/material";

function StepIcon(props) {
  const { active, completed, className } = props;

  return active ? (
    <span style={{ color: "#1976d2" }}>
      <PetsIcon />
    </span>
  ) : (
    <span>
      <PetsIcon />
    </span>
  );
}

StepIcon.propTypes = {
  /**
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * @default false
   */
  completed: PropTypes.bool,
};

const ProfileDetails = ({ profileData }) => {
  const router = useRouter();
  const [activeTab, setActivetab] = useState(0);
  const [orientation, setOrientation] = useState("vertical");
  const steps = [
    "Basic Data",
    "Pedigree",
    "Show Results",
    "Siblings",
    "Progeny",
    "Virtual Breeding",
    // "Confirmation Shows",
  ];

  useLayoutEffect(() => {
    window.innerWidth < 700 && setOrientation("horizontal");
  }, []);

  if (router?.isFallback) {
    return (
      <div className="loading">
        <CircularProgress size={50} />
        <Typography variant="h5">Please Wait</Typography>
      </div>
    );
  }

  return (
    <main className={classes["profile-details"]}>
      <Typography
        className={classes["profile-name"]}
        variant="h3"
        component="h1"
      >
        {profileData.dogs_name}{" "}
        <span
          style={{ color: "#4CB6EA", display: "flex", alignItems: "center" }}
        >
          <MaleIcon fontSize="inherit" />
        </span>
      </Typography>
      <hr />
      <div className={classes["profile-detail"]}>
        <div className={classes["stepper-tab"]}>
          <Box sx={{ maxWidth: "100%" }}>
            <Stepper
              orientation={orientation}
              sx={{
                overflowX: "auto",
              }}
              activeStep={activeTab}
              alternativeLabel={orientation === "horizontal"}
            >
              {steps.map((label, index) =>
                index < 1 ? (
                  // index < 5 ? (
                  <Step key={index}>
                    <StepLabel
                      style={{ cursor: "pointer" }}
                      onClick={() => setActivetab(index)}
                      StepIconComponent={StepIcon}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ) : (
                  <Step key={label}>
                    <StepLabel
                      style={{ cursor: "pointer" }}
                      // onClick={() => setActivetab(index)}
                      StepIconComponent={LockIcon}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                )
              )}
            </Stepper>
          </Box>
          <hr />
        </div>

        <div className={classes["details-tab"]}>
          {activeTab === 0 && <BasicData profileData={profileData} />}
          {activeTab === 1 && <Pedigree />}
          {activeTab === 2 && <ShowResults />}
          {activeTab === 3 && <Siblings />}
          {activeTab === 4 && <Progeny />}
          {/* {activeTab !== 0 && (
            <Typography
              style={{
                // width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                // textAlign: "center",
              }}
              variant="h3"
              component="h1"
            >
              COMING SOON!
            </Typography>
          )} */}
        </div>
      </div>
    </main>
  );
};

export default ProfileDetails;
