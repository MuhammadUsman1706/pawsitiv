import { Typography } from "@mui/material";
import React, { useState } from "react";
import classes from "./Progeny.module.css";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Link from "next/link";

const Progeny = () => {
  const [progenyList, setProgenyList] = useState([
    {
      parent: {
        parentName: "TK's Ferdinand ",
        gender: "Male",
        clubName: "Rottweiler",
        whelped: "May 06, 2016",
        registryNo: "KP 77033",
        breed: "Sire",
      },
      childrens: [
        {
          childrenName: "Maverick's Loco",
          gender: "Female",
          clubName: "Rottweiler",
          whelped: "August 24, 2018 ",
          registryNo: "KP 78497 ",
          sireName: "abc",
          damName: "xyz",
        },
        {
          childrenName: "Maverick's Latte ",
          gender: "Female",
          clubName: "Rottweiler",
          whelped: "August 24, 2018 ",
          registryNo: "KP 7849",
          sireName: "abc",
          damName: "xyz",
        },
      ],
    },
    {
      parent: {
        parentName: "Armagedonn Suny Day's",
        gender: "Male",
        clubName: "Rottweiler",
        whelped: "January 21, 2014",
        registryNo: "KP 78037",
        breed: "Sire",
      },
      childrens: [
        {
          childrenName: "Mavericks Daisy",
          gender: "Female",
          clubName: "Rottweiler",
          whelped: "February 09, 2018",
          registryNo: "KP 78247",
          sireName: "abc",
          damName: "xyz",
        },
      ],
    },
    {
      parent: {
        parentName: "Xoxo Leon of Neoplanta",
        gender: "Male",
        clubName: "Rottweiler",
        whelped: "December 11, 2013 ",
        registryNo: "KP 29065",
        breed: "Sire",
      },
      childrens: [
        {
          childrenName: "Chloe vom Doodles",
          gender: "Female",
          clubName: "Rottweiler",
          whelped: "March 09, 2017",
          registryNo: "KP 72367",
          sireName: "abc",
          damName: "xyz",
        },
      ],
    },
    {
      parent: {
        parentName: "Jagga vom Maverick",
        gender: "Male",
        clubName: "Rottweiler",
        whelped: "January 01, 1970",
        registryNo: "KP 28728",
        breed: "Sire",
      },
      childrens: [
        {
          childrenName: "Maverick's Orro",
          gender: "Female",
          clubName: "Rottweiler",
          whelped: "February 28, 2019",
          registryNo: "KP 79074   ",
          sireName: "abc",
          damName: "xyz",
        },
        {
          childrenName: "Maverick's Onzo",
          gender: "Male",
          clubName: "Rottweiler",
          whelped: "February 28, 2019",
          registryNo: "KP 79075",
          sireName: "abc",
          damName: "xyz",
        },
        {
          childrenName: "Maverick's Onzo",
          gender: "Male",
          clubName: "Rottweiler",
          whelped: "February 28, 2019",
          registryNo: "KP 79075",
          sireName: "abc",
          damName: "xyz",
        },
        {
          childrenName: "Maverick's Onzo",
          gender: "Female",
          clubName: "Rottweiler",
          whelped: "February 28, 2019",
          registryNo: "KP 79075",
          sireName: "abc",
          damName: "xyz",
        },
      ],
    },
  ]);

  return (
    <div className={classes["progeny-main"]}>
      <div>
        <Typography variant="h4">Progeny</Typography>
      </div>

      {progenyList.map((progeny, index) => (
        <div key={index} className={classes["progeny-Main-card"]}>
          <div className={classes.bgImg}></div>
          <div className={classes["progeny-parent-card"]}>
            <img
              style={{ width: "150px", height: "100px", borderRadius: 10 }}
              src="https://redlabelkennels.com/wp-content/uploads/2019/10/37203654_1590208971277591_455457247103811584_o.jpg"
              alt="dog"
            />
            <div className={classes.parentInfo}>
              <div className={classes.parentHeading}>
                <Link
                  href="/breed-profile/Usmane-de-l'Eau-qui-Dort/527686"
                  target="_blank"
                >
                  {progeny.parent.parentName}
                </Link>
                <MaleIcon sx={{ fontSize: 30, color: "#1976D2" }} />
              </div>
              <div>
                <span>{progeny.parent.gender} || </span>
                <span>{progeny.parent.clubName}</span>
              </div>
              <div>
                <span>
                  <span style={{ fontWeight: 500 }}>Whelped: </span>
                  {progeny.parent.whelped} &nbsp;
                </span>
                <span>
                  <span style={{ fontWeight: 500 }}>Registry: </span>
                  <i>{progeny.parent.registryNo}</i>
                </span>
                <div className={classes.breedDiv}>
                  <span>{progeny.parent.breed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={classes["child-main-card"]}>
            {progeny.childrens.map((progenyChildren, index) => (
              <div key={index} className={classes["progeny-child-card"]}>
                <div className={classes["child-details"]}>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljWRv3cD7J0w0FB_uz4ZlrfUvAvhTqNQN9mfHiYm136kt-_UfSh8dA_X7AtZEM6UGcTk&usqp=CAU"
                    alt="dog"
                  />
                  <div className={classes.childInfo}>
                    <div className={classes.childHeading}>
                      <Link
                        href="/breed-profile/Usmane-de-l'Eau-qui-Dort/527686"
                        target="_blank"
                      >
                        <span>{progenyChildren.childrenName}</span>
                      </Link>
                      {progenyChildren.gender === "Male" ? (
                        <MaleIcon sx={{ fontSize: 30, color: "#1976D2" }} />
                      ) : (
                        <FemaleIcon sx={{ fontSize: 30, color: "#B319A6" }} />
                      )}
                    </div>
                    <div>
                      <span>{progenyChildren.gender} || </span>
                      <span>{progenyChildren.clubName}</span>
                    </div>
                    <div className={classes.childContent}>
                      <span>
                        <span style={{ fontWeight: 500 }}>Whelped: </span>
                        {progenyChildren.whelped} &nbsp;
                      </span>
                      <span>
                        <span style={{ fontWeight: 500 }}>Registry: </span>
                        <i>{progenyChildren.registryNo}</i>
                      </span>
                      <div className={classes.sireDamDiv}>
                        <div>
                          <span>Sire: </span>
                          <span>{progenyChildren.sireName}</span>
                        </div>
                        <div>
                          <span>Dam: </span>
                          <span>{progenyChildren.damName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Progeny;
