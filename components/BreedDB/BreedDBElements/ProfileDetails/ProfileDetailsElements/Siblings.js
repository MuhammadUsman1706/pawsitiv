import { Typography } from "@mui/material";
import React, { useState } from "react";
import classes from "./Siblings.module.css";
import Link from "next/link";

const Siblings = () => {
  const [siblingList, setSiblingList] = useState([
    {
      // siblingImage: "https://www.corydonanimalhospital.ca/wp-content/uploads/sites/80/2019/02/shutterstock_218749363-1024x683.jpg",
      siblingName: "Harra Vom Maverick",
      gender: "Female",
      clubName: "Rottweiler",
      whelped: "January 25, 2014",
      registryNo: "KP 28195",
    },
    {
      siblingImage:
        "https://www.corydonanimalhospital.ca/wp-content/uploads/sites/80/2019/02/shutterstock_218749363-1024x683.jpg",
      siblingName: "Harra Vom Maverick",
      gender: "Female",
      clubName: "Rottweiler",
      whelped: "January 25, 2014",
      registryNo: "KP 28195",
    },
    {
      siblingImage:
        "https://www.corydonanimalhospital.ca/wp-content/uploads/sites/80/2019/02/shutterstock_218749363-1024x683.jpg",
      siblingName: "Harra Vom Maverick",
      gender: "Female",
      clubName: "Rottweiler",
      whelped: "January 25, 2014",
      registryNo: "KP 28195",
    },
  ]);

  return (
    <div className={classes["sibling-div"]}>
      <div>
        <Typography variant="h4">Siblings</Typography>
      </div>
      {siblingList.map((sibling, index) => (
        <div className={classes["sibling-cards"]} key={index}>
          <div className={classes["sibling-card"]}>
            {sibling.siblingImage ? (
              <img
                className={classes.sliblingImg}
                src={sibling.siblingImage}
                alt={sibling.siblingName}
              />
            ) : (
              <img
                className={classes.sliblingImg}
                src="/images/sibling_firstImg.svg"
                alt={sibling.siblingName}
              />
            )}
            <div className={classes.siblingInfo}>
              <Link
                href="/breed-profile/Harra-Vom-Haus-Ghor/394199"
                target="_blank"
              >
                {sibling.siblingName}
              </Link>
              <div>
                <span>{sibling.gender} || </span>
                <span>{sibling.clubName}</span>
              </div>
              <div>
                <span>
                  <span style={{ fontWeight: 500 }}>Whelped: </span>
                  {sibling.whelped} &nbsp;
                </span>
                <span>
                  <span style={{ fontWeight: 500 }}>Registry: </span>
                  <i>{sibling.registryNo}</i>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Siblings;
