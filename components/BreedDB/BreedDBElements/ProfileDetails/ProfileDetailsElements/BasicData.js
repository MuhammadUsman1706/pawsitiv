import React from "react";
import Carousel from "react-material-ui-carousel";
import Typography from "@mui/material/Typography";

import classes from "./BasicData.module.css";

const BasicData = ({ profileData }) => {
  return (
    <div className={classes["basic-data"]}>
      <div style={{ width: "100%" }}>
        <Typography variant="h4">Basic Data</Typography>
        <ul className={classes["outer-list"]}>
          <li>
            <Typography variant="h6">General</Typography>
          </li>
          <ul className={classes["nested-list"]}>
            <li>
              <span>Whelped:</span> {profileData?.dob}
            </li>
            <li>
              <span>Breed:</span> {profileData?.breed_name}
            </li>
            <li>
              <span>Gender:</span> {profileData?.gender}
            </li>
            <li>
              <span>Microchip:</span> {profileData?.microchip}
            </li>
            <li>
              <span>Title:</span> {profileData?.show_title || "-"}
            </li>
          </ul>
        </ul>
        <ul className={classes["outer-list"]}>
          <li>
            <Typography variant="h6">Parents</Typography>
          </li>
          <ul className={classes["nested-list"]}>
            <li>
              <span>Sire:</span> {profileData?.sire_name || "-"}
            </li>
            <li>
              <span>Dam:</span> {profileData?.dam_name || "-"}
            </li>
            {/* <li>
              <span id={classes.rating}>
                Ratings: &nbsp;
                <span style={{ color: "#007acc" }}>
                  {[0, 0, 0, 0, 0].map(() => (
                    <StarRateIcon color="inherit" />
                  ))}
                </span>
              </span>
            </li>
            <li>
              <span>Working:</span> 9 to 5
            </li> */}
            {/* <li>
              <span>Breeder(s):</span> Geralt of Rivia
            </li>
            <li>
              <span>Owner(s):</span> Yennefer of Vengerberg
            </li> */}
          </ul>
        </ul>
        <ul className={classes["outer-list"]}>
          <li>
            <Typography variant="h6">Registration</Typography>
          </li>
          <ul className={classes["nested-list"]}>
            <li>
              <span>No:</span> {profileData.reg_no}
            </li>
            <li>
              <span>Club: </span>
              {profileData?.reg_with || "-"}
            </li>
          </ul>
        </ul>

        <ul className={classes["outer-list"]}>
          {/* <li>
            <Typography variant="h6">Other</Typography>
          </li> */}
          <ul className={classes["nested-list"]}>
            <li>
              <span>Breeder(s):</span> {profileData?.breeders || "-"}
            </li>
            <li>
              <span>Owner(s):</span> {profileData?.dog_owner || "-"}
            </li>
          </ul>
        </ul>
      </div>

      <div className={classes["dog-image"]}>
        <Typography variant="h4">Image</Typography>

        {profileData?.profile_photo ? (
          <img
            className={classes["carousel-image"]}
            src={profileData.profile_photo}
          />
        ) : (
          <Carousel>
            <img
              className={classes["carousel-image"]}
              src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt={profileData.show_title}
            />
            <img
              className={classes["carousel-image"]}
              src="https://thumbs.dreamstime.com/b/portrait-funny-dog-behind-wheel-car-jack-russell-terrier-sunglasses-151057370.jpg"
              alt={profileData.show_title}
            />
            <img
              className={classes["carousel-image"]}
              src="https://img.freepik.com/free-photo/front-view-funny-cute-dog-concept_23-2148786514.jpg?w=2000"
              alt={profileData.show_title}
            />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default BasicData;
